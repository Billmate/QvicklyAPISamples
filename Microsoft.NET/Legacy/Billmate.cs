using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.Net;
using System.Web.Script.Serialization;

namespace BillmateAPI
{
    public class Billmate
    {
        private const string URL = "api.billmate.se";

        private string ID;
        private string KEY;
        private Boolean SSL;
        private Boolean TEST;
        private Boolean DEBUG;
        private Dictionary<String, String> REFERER;
        private static readonly Encoding encoding = Encoding.UTF8;
        private string logs = "";

        public string Client = ".NET:Billmate:2.0.1";
        public string Language = "";
        public string Server = "";

        public string Logs { get { return DEBUG ? logs : ""; } }

        public Billmate(string id, string key, Boolean ssl = true, Boolean test = false, Boolean debug = false, Dictionary<String, String> referer = null)
        {
            this.ID = id;
            this.KEY = key;
            this.SSL = ssl;
            this.DEBUG = debug;
            this.TEST = test;
            this.REFERER = referer;
        }
        public Dictionary<string, object> Call(string function, Dictionary<string, object> parameters)
        {


            Dictionary<string, object> credentials = new Dictionary<string, object>();
            credentials["id"] = ID;
            credentials["hash"] = Hash(ToJSON(parameters));
            credentials["version"] = Server;
            credentials["client"] = Client;
            credentials["serverdata"] = REFERER;
            credentials["time"] = ConvertToUnixTimestamp();
            credentials["test"] = TEST ? "1" : "0";
            credentials["language"] = Language;

            Dictionary<string, object> request = new Dictionary<string, object>();
            request["credentials"] = credentials;
            request["data"] = parameters;
            request["function"] = function;
            this.Out("CALLED FUNCTION", function);
            return Request(request);
        }
        private Dictionary<string, object> Request(object parameters)
        {
            try
            {
                String rStr = EncodeNonAsciiCharacters(ToJSON(parameters));
                this.Out("PARAMETERS TO BE SENT", rStr);
                byte[] byteArray = encoding.GetBytes(rStr);
                WebRequest request = WebRequest.Create("http" + (SSL ? "s" : "") + "://" + URL);
                request.ContentType = "application/json";
                request.Method = "POST";
                request.ContentLength = byteArray.Length;

                Stream dataStream = request.GetRequestStream();
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();

                WebResponse response = request.GetResponse();
                dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string responseFromServer = reader.ReadToEnd();
                this.Out("RESPONSE", responseFromServer);
                Dictionary<string, object> result = FromJSON(responseFromServer);
                if (result.ContainsKey("code"))
                {
                    throw new BillmateException(result["code"].ToString(), result["message"].ToString(), logs);
                }
                else if (result.ContainsKey("credentials"))
                {
                    Dictionary<string, object> credentials = (Dictionary<string, object>)result["credentials"];
                    VerifyHash(responseFromServer, credentials["hash"].ToString());
                    return (Dictionary<string, object>)result["data"];
                }

                reader.Close();
                dataStream.Close();
                response.Close();
                return result;
            }
            catch (BillmateException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw new BillmateException("9510", ex.Message, logs);
            }

        }
        private string ToJSON(object parameters)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string jsonString = serializer.Serialize((object)parameters);
            return jsonString;
        }
        private Dictionary<string, object> FromJSON(string str)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Deserialize<Dictionary<string, object>>(str);
        }
        private void VerifyHash(string response, string hash2verify)
        {
            int index = response.IndexOf("\"data\":")+7;
            string str = response.Substring(index,response.Length-index-1);
            
            if (Hash(str) != hash2verify) throw new BillmateException("9511", "Verification failed for hash", logs);
        }
        private string Hash(string tobehashed)
        {
            tobehashed = EncodeNonAsciiCharacters(tobehashed);
            this.Out("TO BE HASHED DATA ", tobehashed);
            var keyByte = encoding.GetBytes(KEY);
            using (var hmacsha512 = new HMACSHA512(keyByte))
            {
                hmacsha512.ComputeHash(encoding.GetBytes(tobehashed));
                string hash = ByteToString(hmacsha512.Hash).ToLower();
                this.Out("HASH", hash);
                return hash;
            }
        }
        private string ByteToString(byte[] buff)
        {
            string sbinary = "";
            for (int i = 0; i < buff.Length; i++)
                sbinary += buff[i].ToString("X2"); /* hex format */
            return sbinary;
        }
        private void Out(string h, string b)
        {
            this.logs += h + ": " + b + "\r\n";
        }
        static int ConvertToUnixTimestamp()
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            TimeSpan diff = DateTime.Now - origin;
            return (int)diff.TotalSeconds;
        }
        static string EncodeNonAsciiCharacters(string value)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in value)
            {
                if (c > 127)
                {
                    // This character is too big for ASCII
                    string encodedValue = "\\u" + ((int)c).ToString("x4");
                    sb.Append(encodedValue);
                }
                else
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
    }
}
