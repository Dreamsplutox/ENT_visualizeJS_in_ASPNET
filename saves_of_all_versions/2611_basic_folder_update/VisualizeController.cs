using TestVisualizeJS.Models;
using System;
using System.Net;
using System.IO;
using System.Text;
using System.Xml;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Security.Application;

namespace TestVisualizeJS.Controllers.Visualize
{
    public class VisualizeController : Controller
    {
        //username and password as global var to use them in functions
        //private string username_glob { get; set; }
        //private string password_glob { get; set; }

        // GET: Visualize
        public ActionResult Index(string username = "", string password = "", bool login_form_completed = false, string folder_choice = "/L4_logistics/Conception/rapports_test/test/test_mongodb")
        {
            VisiteurWeb client = new VisiteurWeb();
            String nom = "Arnaud";
            client.Nom = nom;
            client.Username = username;
            client.Password = password;
            ViewData["visiteur_name"] = nom;


            //If folder_choidce == "", the user choose an unauthorized folder, change it to default and set an error
            bool folder_choice_error = false; 
            if(folder_choice == "nothing")
            {
                folder_choice = "/L4_logistics/Conception/rapports_test/test/test_mongodb";
                folder_choice_error = true;
                
            }


            //if the login form isn't completed, return to classic login form page
            if (login_form_completed == false)
            {
                ViewBag.folder_choice = "";
                ViewBag.first_resource_label = "";
                ViewBag.first_resource_uri = "";
                ViewBag.first_resource_type = "";
                ViewBag.error = "";
                ViewBag.folder_error = "";
                ViewBag.credentials = ":";
                return View("Index", client);
            }

            //// GET URI OF FIRST JASPER RESSOURCE FOR OUR FOLDER ////
            //var folder_choice = "/L4_logistics/Conception/rapports_test/test/test_mongodb";//"/L4_logistics/Conception/rapports_test/test/test_mongodb/sous_dossier_num_2/sous_sous_dossier_test/so_so_so_dossier/so_so_so_so_dossier";

            // ideas to set the folder choice var based on the role of the user ==> 
            //1) build query like "URL_rest_list_reports" ==> URL_rest_list_user_roles = "http://srvreporting-01:8080/jasperserver-pro/rest_v2/roles?user=" + username
            //2) User Cookie, webrequest etc to check if the query succeed, if that's not the case, raise error
            //3) If everything is OK, Get roles tags. Then check for the "highest" role possible + assign specific folder for this role  
            //example of array_roles ==  ["ROLE_USER" ==> "/public/prospect_reports", "ROLE_ADMIN" ==> "/L4_logistics/rapports_sensibles"]

            // Credentials
            var credentials_jasper = username + ":" + password;

            // List all reports of a folder X (here conception/rapports_test/test/test_mongodb) of the repository
            String encoded_rest_list_reports = System.Convert.ToBase64String(System.Text.Encoding.
            GetEncoding("ISO-8859-1").GetBytes(credentials_jasper));
            string URL_rest_list_reports = "http://srvreporting-01:8080/jasperserver-pro/rest_v2/resources?folderUri=" + folder_choice + "&sortBy=uri";

            CookieContainer myContainer_rest_list_reports = new CookieContainer();
            HttpWebRequest request_rest_list_reports = (HttpWebRequest)WebRequest.Create(URL_rest_list_reports);

            request_rest_list_reports.CookieContainer = myContainer_rest_list_reports;
            request_rest_list_reports.PreAuthenticate = true;
            request_rest_list_reports.Headers.Add("Authorization", "Basic " + encoded_rest_list_reports);

            HttpWebResponse response_rest_list_reports;
            // If credentials are correct, it's possible to get the response for our query, if not, send an error to the view
            try
            {
                response_rest_list_reports = (HttpWebResponse)request_rest_list_reports.GetResponse();
            }
            catch (Exception e)
            {
                ViewBag.folder_choice = "";
                ViewBag.first_resource_label = "";
                ViewBag.first_resource_uri = "";
                ViewBag.first_resource_type = "";
                ViewBag.error = "Erreur, mauvaise combinaison (nom d'utilisateur / mot de passe)";
                ViewBag.credentials = credentials_jasper;
                ViewBag.folder_error = "";
                return View("Index", client);
            }

            var response_data_stream_list_reports = response_rest_list_reports.GetResponseStream();

            // Read the answer (XML format)
            StreamReader response_reader_list_reports = new StreamReader(response_data_stream_list_reports);
            string response_str_list_reports = response_reader_list_reports.ReadToEnd();

            // String to XML
            XmlDocument string_to_xml = new XmlDocument();
            string_to_xml.LoadXml(response_str_list_reports);

            // Get all "label", "uri" and "resourceType" tags of the list
            XmlNodeList labelList = string_to_xml.GetElementsByTagName("label");
            XmlNodeList uriList = string_to_xml.GetElementsByTagName("uri");
            XmlNodeList resourceTypeList = string_to_xml.GetElementsByTagName("resourceType");

            // Now we need to find the first resource (dashboard or reportUnit)

            for (int i = 0; i < labelList.Count; i++)
            {
                if (resourceTypeList[i].InnerXml == "dashboard" ||
                    resourceTypeList[i].InnerXml == "reportUnit")
                {
                    // stock folder_choice, resource label and uri in Viewbags to transfer data to the View

                    ViewBag.folder_choice = folder_choice;
                    ViewBag.first_resource_label = labelList[i].InnerXml;
                    ViewBag.first_resource_uri = uriList[i].InnerXml;
                    ViewBag.first_resource_type = resourceTypeList[i].InnerXml;
                    ViewBag.error = "";
                    if (folder_choice_error == true)
                    {
                        ViewBag.folder_error = "Vous n avez pas les autorisations necessaires pour choisir ce dossier source, le dossier source par défaut sera utilisé";
                    }
                    else
                    {
                        ViewBag.folder_error = "";
                    }
                    ViewBag.credentials = HttpUtility.UrlEncode(username) + ":" + HttpUtility.UrlEncode(password);
                    break;
                }
            }

            return View("Index", client);

        }


        public ActionResult myForm(Models.VisiteurWeb formData)
        {
            VisiteurWeb client = new VisiteurWeb();
            String nom = "Arnaud";
            client.Nom = nom;

            //username_glob = formData.Username;
            //password_glob = formData.Password;

            return RedirectToAction("Index", "Visualize", new { username = formData.Username, password = formData.Password, login_form_completed = true });
        }

        public ActionResult myUpdateForm(Models.VisiteurWeb formData)
        {
            VisiteurWeb client = new VisiteurWeb();
            String nom = "Arnaud";
            client.Nom = nom;

            string folder_is_valid = "nothing";

            //Check if folder_choice is autorized, if not we will send "" to the ActionResult
            string[] autorized_folders = { "/L4_logistics/Conception/rapports_test/test/test_mongodb", "/L4_logistics/Conception/rapports_test/copy_reports" };
            foreach (string x in autorized_folders)
            {
                if(x == formData.FolderChoice)
                {
                    folder_is_valid = formData.FolderChoice;
                }
            }

            
            return RedirectToAction("Index", "Visualize", new { username = formData.Username, password = formData.Password, login_form_completed = true, folder_choice = folder_is_valid });
        }
   
    }
}