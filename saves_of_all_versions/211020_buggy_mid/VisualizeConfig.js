//// USEFULL FUNCTIONS SECTION ////

//Get correct color for folder resource (based on the "level" of the folder in the repo)
function getFolderColor(original_folder, current_folder, colors_array = ["brown", "blue", "red",
    "orange", "purple", "green", "grey"]) {

    var current_size = current_folder.split("/").length;
    var original_size = original_folder.split("/").length;
    var color_size = colors_array.length;

    //if there are more sub folders than colors available, color with the first color
    if ((current_size - original_size) >= color_size) {
        return colors_array[0];
    } else {
        return colors_array[current_size - original_size];
    }
}

//Get all resource of the specified folder and put them in a select element
function buildResourceSelectControl(repo, folder_choice) {
    console.log("buildResourceSelectControl function");
    var list_all_uri = [];
    var list_resources_types = [];
    var list_resources_labels = [];
    var list_resources_uri = [];

    list_all_uri.push(folder_choice);
    const resourceNames = repo.reduce(function (list, option) {
        console.log(`${option.label}`);
        //check new uri pattern ?
        if (!list_all_uri.includes(option.uri) && option.resourceType == "folder") {
            console.log("add new uri " + option.uri);
            list_all_uri.push(option.uri);
        }

        if (option.resourceType != "folder") {
            //fill resource arrays
            list_resources_types.push(option.resourceType);
            list_resources_labels.push(option.label);
            list_resources_uri.push(option.uri);
            //return list + `<option disabled style='background-color: blue; color:white;'>${option.label}</option>`
        }

    }, "");

    console.log("final uri list = " + list_resources_uri + "\n now time to sort");

    //sort resources
    var current_resource_uri = "";
    var final_list = "";
    var folder_color = "";

    for (i = 0; i < list_all_uri.length; i++) {
        console.log("elem " + i + "\n");

        //get color of folder element
        folder_color = getFolderColor(folder_choice, list_all_uri[i]);
        //create folder option element
        final_list += "<option disabled style='background-color:" + folder_color + " ; color:white;'>"
            + list_all_uri[i].split("/").pop() + "</option>"

        for (y = 0; y < list_resources_uri.length; y++) {
            //modify current resource uri to classify the resource 
            current_resource_uri = list_resources_uri[y].split("/");
            current_resource_uri.pop();
            current_resource_uri = current_resource_uri.join("/");

            if (current_resource_uri == list_all_uri[i]) {
                console.log("uri base " + i + " is in resource " + y + " " + list_resources_uri[y]);
                final_list += "<option name=" + list_resources_types[y] + " value=" + list_resources_uri[y] + ">" + list_resources_labels[y] + "</option>" //was labels
            }
        }
    }

    // Change existing elements (select element from view and label)
    var my_label = document.getElementById("label_resource_selection");
    my_label.innerHTML = "Ressources du dossier <b>" + folder_choice + "</b>: ";

    var my_select = document.getElementById("resource_selection");
    my_select.innerHTML = final_list;
}

//Hide / show report HTML elements (if resource == dashboard, hide them)
function hideOrShowReportHTMLElements(hide) {
    if (hide) {
        $("#report_ic").css("display", "none");
        $("#report_features").css("display", "none");
        $("#report_bootstrap_div").css("display", "none");
        //select container for dashboard
        $("#container").css("display", "none");
        $("#dashboard_container").css("display", "block");
    } else {
        $("#report_ic").css("display", "block");
        $("#report_features").css("display", "block");
        $("#report_bootstrap_div").css("display", "block");
        //select container for report
        $("#container").css("display", "block");
        $("#dashboard_container").css("display", "none");
    }
}

//Config of the export "<select>" element 
function buildControl(name, options) {

    function buildOptions(options) {
        var template = "<option>{value}</option>";
        return options.reduce(function (memo, option) {
            return memo + template.replace("{value}", option);
        }, "")
    }

    var template = "<label style='margin-left:15px;'>{label}</label><select style='margin-left:15px;'>{options}</select><br>",
        content = template.replace("{label}", name)
            .replace("{options}", buildOptions(options));

    var $control = $(content);
    $control.insertBefore($("#export_button"));
    //return select
    return $($control[1]);
}


//// DYNAMICAL FOLDER AND RESSOURCE SET (FROM OUR CONTROLLER) ==> GLOBAL VARIABLES ////
var current_resource = first_resource_uri_var;
var current_resource_type = first_resource_type_var;
var folder_choice = folder_choice_var
console.log("current res : " + current_resource);
console.log("current res type : " + current_resource_type);
console.log("fold choice : " + folder_choice);

/// Listes des ressources testées ///
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb",
//"/L4_logistics/Planifications/Facturation/SMB/SMB_FAC_SYNTHESE",
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/sous_dossier_num_2/regroup_smallable",
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb",
//"/L4_logistics/Conception/rapports_test/test/test_planif_rapport_modif/test_plani",

//// VISUALIZE SECTION ////

visualize.config({
    auth: {
        name: "asimon",
        password: "37%22%2FvBjA"
    }
});

visualize(function (v) {

    //// GET LIST OF RESOURCES (INSIDE FOLDER) SECTION ////

    v.resourcesSearch({
        folderUri: folder_choice,
        sortBy: "uri",
        recursive: true,
        types: ["dashboard", "reportUnit", "folder"],
        success: function (repo) {
            buildResourceSelectControl(repo, folder_choice);
        },
        error: function (err) {
            console.log(err);
        }
    });


    if (first_resource_type_var == "dashboard") {
        //// CONFIGURE DASHBOARD SECTION ////
        hideOrShowReportHTMLElements(true);
        dashboard = v.dashboard({
            resource: current_resource,
            container: "#dashboard_container",
            success: function () {
                console.log("dashboard loaded");
                //hideOrShowReportHTMLElements(true);
                //export_button.disabled = false;
            },
            error: function (error) {
                hideOrShowReportHTMLElements(false);
                console.log(error);
            }
        });
    } else {
        //// CONFIGURE REPORT SECTION ////
        hideOrShowReportHTMLElements(false);
        report = v.report({
            resource: current_resource,
            container: "#container",
            //uncomment to change default behaviour
            //scale: "width",
            //scale: "height",
            //scale: 1,
            scale: "container",
            scrollToTop: false,

            success: function () {
                console.log("report running");
                //hideOrShowReportHTMLElements(false);
                export_button.disabled = false;
            },

            error: function (error) {
                export_button.disabled = true;
                console.log(error);
            }
        });

        //// CONFIGURE INPUT CONTROLS SECTION ////
        inputControls = v.inputControls({
            resource: current_resource,//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb"
            container: "#ic",
            events: {
                change: function (params, error) {
                    if (!error) {
                        export_button.disabled = false;
                        report.params(params).run();
                    }
                }
            }
        });

        //// PAGINATION SECTION ////

        //previous pagination
        $("#previousPage").click(function () {
            var currentPage = report.pages() || 1;

            report
                .pages(--currentPage)
                .run()
                .fail(function (err) { alert(err); });
        });

        //next pagination
        $("#nextPage").click(function () {
            var currentPage = report.pages() || 1;

            report
                .pages(++currentPage)
                .run()
                .fail(function (err) { alert(err); });

            //window.location.href = "http://localhost:44334/#container";
        });

        //pagination search
        $("#page").on("change", function () {
            report
                .pages($(this).val())
                .run()
                .fail(function (e) { console.log(report.pages()); alert(e); });
        });


        //// EXPORT SECTION ////

        //get report formats
        var reportExports = v.report
            .exportFormats
            .concat(["json"]);

        //Call buildControl to create a "<select>" element (all export options)
        $select = buildControl("Export to : ", reportExports),
            //Get the export button
            $export_button = $("#export_button"),

            //Config of the export button
            $export_button.click(function () {

                console.log($select.val());

                report.export({
                    //export options here
                    outputFormat: $select.val(),
                    //pages: "1-2" //exports all pages if not specified
                }, function (link) {
                    var url = link.href ? link.href : link;
                    window.location.href = url;
                }, function (error) {
                    console.log(error);
                });
            });
    }

    //when the user choose an element in the select resource control, change the current resource
    $("#resource_selection").on("change", function () {
        current_resource = $("#resource_selection").val();
        current_resource_type = $("#resource_selection").find('option:selected').attr("name");
        console.log("--new cur res = " + current_resource + " type : " + current_resource_type);

        if (current_resource_type == "dashboard") {
            console.log("dashboard rendering");
            dashboard = v.dashboard({
                resource: current_resource,
                container: "#dashboard_container",
                success: function () {
                    hideOrShowReportHTMLElements(true);
                    export_button_disabled = false;
                },
                error: function (error) {
                    export_button.disabled = true;
                    console.log(error);
                }
            });
        } else {
            //render report from provided resource
            report = v.report({
                resource: current_resource,
                container: "#container",
                //uncomment to change default behaviour
                //scale: "width",
                //scale: "height",
                //scale: 1,
                scale: "container",
                success: function () {
                    hideOrShowReportHTMLElements(false);
                    export_button.disabled = false;
                },

                error: function (error) {
                    export_button.disabled = true;
                    console.log(error);
                }
            });

            /// input controls section ///
            inputControls = v.inputControls({
                resource: current_resource,//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb"
                container: "#ic",
                events: {
                    change: function (params, error) {
                        if (!error) {
                            export_button.disabled = false;
                            report.params(params).run();
                        }
                    }
                }
            });
        }
    });

});