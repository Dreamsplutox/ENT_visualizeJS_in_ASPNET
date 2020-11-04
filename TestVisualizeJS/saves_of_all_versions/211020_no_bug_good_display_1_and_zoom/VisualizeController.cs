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

namespace TestVisualizeJS.Controllers.Visualize
{
    public class VisualizeController : Controller
    {
        // GET: Visualize
        public ActionResult Index()
        {
            VisiteurWeb client = new VisiteurWeb();
            //String type = "PDF";
            String nom = "Arnaud";
            client.Nom = nom;
            ViewData["visiteur_name"] = nom;

            //// GET URI OF FIRST JASPER RESSOURCE FOR OUR FOLDER ////
            var folder_choice = "/L4_logistics/Conception/rapports_test/test/test_mongodb";//"/L4_logistics/Conception/rapports_test/test/test_mongodb/sous_dossier_num_2/sous_sous_dossier_test/so_so_so_dossier/so_so_so_so_dossier";//"/L4_logistics/Conception/rapports_test/test/test_mongodb";//"/L4_logistics/Conception/rapports_test/copy_reports";//"/L4_logistics/Conception/rapports_test/test/test_mongodb";//was &type=reportunit
            var credentials_jasper = "asimon:37\"/vBjA"; // Credentials
            
            // List all reports of a folder X (here conception/rapports_test/test/test_mongodb) of the repository

            String encoded_rest_list_reports = System.Convert.ToBase64String(System.Text.Encoding.
                GetEncoding("ISO-8859-1").GetBytes(credentials_jasper));
            string URL_rest_list_reports = "http://srvreporting-01:8080/jasperserver-pro/rest_v2/resources?folderUri="+folder_choice+"&sortBy=uri";

            CookieContainer myContainer_rest_list_reports = new CookieContainer();
            HttpWebRequest request_rest_list_reports = (HttpWebRequest)WebRequest.Create(URL_rest_list_reports);

            request_rest_list_reports.CookieContainer = myContainer_rest_list_reports;
            request_rest_list_reports.PreAuthenticate = true;
            request_rest_list_reports.Headers.Add("Authorization", "Basic " + encoded_rest_list_reports);

            HttpWebResponse response_rest_list_reports = (HttpWebResponse)request_rest_list_reports.GetResponse();
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
                if(resourceTypeList[i].InnerXml == "dashboard" || 
                    resourceTypeList[i].InnerXml == "reportUnit")
                {
                    // stock folder_choice, resource label and uri in Viewbags to transfer data to the View

                    ViewBag.folder_choice = folder_choice;
                    ViewBag.first_resource_label = labelList[i].InnerXml;
                    ViewBag.first_resource_uri = uriList[i].InnerXml;
                    ViewBag.first_resource_type = resourceTypeList[i].InnerXml;
                    break;
                }
            }

            return View("Index", client);

        }
    }
}