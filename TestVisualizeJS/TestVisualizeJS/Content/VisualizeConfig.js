visualize.config({
    auth: {
        name: "j_user",
        password: "j_password"
    }
});




/// Listes des ressources testées ///
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb",
//"/L4_logistics/Planifications/Facturation/SMB/SMB_FAC_SYNTHESE",
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/sous_dossier_num_2/regroup_smallable",
//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb",
//"/L4_logistics/Conception/rapports_test/test/test_planif_rapport_modif/test_plani",

//// MANUAL FOLDER AND RESSOURCE SET
//var current_ressource = "/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb";
// var folder_choice = "/L4_logistics/Conception/rapports_test/test/test_mongodb";//"/L4_logistics/Conception/rapports_test/copy_reports";

//// DYNAMICAL FOLDER AND RESSOURCE SET (FROM OUR CONTROLLER) ////
var current_ressource = first_resource_uri_var;
var folder_choice = folder_choice_var


console.log("current res : " + current_ressource);
console.log("fold choice : " + folder_choice);

visualize(function (v) {

    //// GET LIST OF RESOURCES (INSIDE FOLDER) SECTION ////

    v.resourcesSearch({
        folderUri: folder_choice,
        sortBy: "uri",
        recursive: true,
        types: ["dashboard", "reportUnit", "folder"],
        success: function (repo) {
            console.log(repo);
            console.log("Test start");
            var list_all_uri = [];
            var list_all_resources_sorted = [];
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

                if (option.resourceType == "folder") {
                    return list + `<option disabled style='background-color: blue; color:white;'>${option.label}</option>`
                } else {
                    //fill resource arrays
                    list_resources_labels.push(option.label);
                    list_resources_uri.push(option.uri);
                }
                return list + `<option>${option.label}</option>`
            }, "");

            console.log("final uri list = " + list_resources_uri + "\n now time to sort");

            //sort resources
            var current_resource_uri = "";
            var final_list = "";

            for (i = 0; i < list_all_uri.length; i++) {
                console.log("elem " + i + "\n");

                //create folder option element
                final_list += "<option disabled style='background-color: blue; color:white;'>"
                    + list_all_uri[i].split("/").pop() + "</option>"

                for (y = 0; y < list_resources_uri.length; y++) {
                    //modify current resource uri to classify the resource 
                    current_resource_uri = list_resources_uri[y].split("/");
                    current_resource_uri.pop();
                    current_resource_uri = current_resource_uri.join("/");

                    if (current_resource_uri == list_all_uri[i]) {
                        console.log("uri base " + i + " is in resource " + y + " " + list_resources_uri[y]);
                        final_list += "<option>" + list_resources_uri[y] + "</option>" //was labels
                    }
                }

            }
            // OLD
            //const listOfNames = "<label>Ressources du dossier <b>" + folder_choice + "</b>: </label>" + //folder_choice.split("/").pop()
            //    "<select id='resources_list'>" + final_list + "</select>"
            //$('#container2').append($(listOfNames));

            // NEW change existing elements
            var my_label = document.getElementById("label_resource_selection");
            my_label.innerHTML = "Ressources du dossier <b>" + folder_choice + "</b>: ";

            var my_select = document.getElementById("resource_selection");
            my_select.innerHTML = final_list;


        },
        error: function (err) {
            console.log(err);
        }
    });

    //// CONFIGURE INPUT CONTROLS BASIS SECTION ////
    /// ADVANCED VERSION ///

    //get the div element
    //var input_controls_div = document.getElementById("input_controls_div");
    //current_ressource = $("#resources_list").val() == undefined ? "/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb" : ("#resources_list").val();
    //alert("current ressource " + current_ressource);

    inputControls = v.inputControls({
        resource: current_ressource,//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb"
        container: "#ic",
        events: {
            change: function (params, error) {
                if (!error) {
                    button.removeAttribute("disabled"); //export mode ON
                    report.params(params).run();
                }
            }
        }
    });

    //render report from provided resource
    report = v.report({ //it was v(#id_container)
        resource: current_ressource,
        container: "#container",
        //uncomment to change default behaviour
        //scale: "width",
        //scale: "height",
        //scale: 1,
        scale: "container",
        /*params: {
            //BeginDateTimeO: ["DAY-1"],
            //EndDateTimeO: ["DAY"]
        },*/
        success: function () {
            button.removeAttribute("disabled");
        },

        error: function (error) {
            console.log(error);
        }
    });

    $("#resource_selection").on("change", function () {
        console.log("TU FAIS QUOI LA" + $("#resource_selection").val());
        current_ressource = $("#resource_selection").val();
        console.log("--new cur res = " + current_ressource);

        inputControls = v.inputControls({
            resource: current_ressource,//"/L4_logistics/Conception/rapports_test/test/test_mongodb/adaptative_mongodb",//"/L4_logistics/Conception/rapports_test/test/test_mongodb/sous_dossier_num_2/regroup_smallable",
            container: "#ic",
            events: {
                change: function (params, error) {
                    if (!error) {
                        button.removeAttribute("disabled"); //export mode ON
                        report.params(params).run();
                    }
                }
            }
        });

        //render report from provided resource
        report = v.report({ //it was v(#id_container)
            resource: current_ressource,
            container: "#container",
            scale: "container",
            success: function () {
                button.removeAttribute("disabled");
            },
            error: function (error) {
                console.log(error);
            }
        });


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
    $select = buildControl("Export to: ", reportExports),
        //Get the export button
        $button = $("#button"),

        //Config of the export button
        $button.click(function () {

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

    //Config of the export "<select>" element
    function buildControl(name, options) {

        function buildOptions(options) {
            var template = "<option>{value}</option>";
            return options.reduce(function (memo, option) {
                return memo + template.replace("{value}", option);
            }, "")
        }

        var template = "<label>{label}</label><select>{options}</select><br>",
            content = template.replace("{label}", name)
                .replace("{options}", buildOptions(options));

        var $control = $(content);
        $control.insertBefore($("#button"));
        //return select
        return $($control[1]);
    }


});