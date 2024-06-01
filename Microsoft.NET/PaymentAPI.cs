/**
 * Qvickly
 *
 * Qvickly Payment API - C# Class
 *
 * LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
 * This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
 *
 * @category Qvickly
 * @package PaymentAPI
 * @author Thomas Björk <thomas.bjork@qvickly.io>
 * @copyright 2013-2024 Billmate AB
 * @license Proprietary and fully owned by Billmate AB
 * @version 1.0.0
 * @link http://www.qvickly.io
 *
 * History:
 * 1.0.0 20240212 Thomas Björk: First version
 */
 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;

public class PaymentAPI
{
    private string ID;
    private string KEY;
    private string URL = "api.qvickly.io";
    private string MODE = "CURL";
    private bool SSL = true;
    private bool TEST = false;
    private bool DEBUG = false;
    private Dictionary<string, string> REFERER = new Dictionary<string, string>();

    public PaymentAPI(string id, string key, bool ssl = true, bool test = false, bool debug = false, Dictionary<string, string> referer = null)
    {
        ID = id;
        KEY = key;
        SSL = ssl;
        TEST = test;
        DEBUG = debug;
        REFERER = referer ?? new Dictionary<string, string>();

        if (!REFERER.ContainsKey("QVICKLY_CLIENT"))
            REFERER.Add("QVICKLY_CLIENT", "Qvickly:CSharp:2.2.0");

        if (!REFERER.ContainsKey("QVICKLY_SERVER"))
            REFERER.Add("QVICKLY_SERVER", "2.5.0");

        if (!REFERER.ContainsKey("QVICKLY_LANGUAGE"))
            REFERER.Add("QVICKLY_LANGUAGE", "");
    }

    public dynamic Call(string function, dynamic parameters)
    {
        var values = new
        {
            credentials = new
            {
                id = ID,
                hash = Hash(JsonConvert.SerializeObject(parameters)),
                version = "2.2.3",
                client = "Qvickly:2.2.0",
                serverdata = parameters.Concat(REFERER).ToDictionary(kvp => kvp.Key, kvp => kvp.Value),
                time = DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds,
                test = TEST ? "1" : "0",
                language = ""
            },
            data = parameters,
            function
        };

        Out("CALLED FUNCTION", function);
        Out("PARAMETERS TO BE SENT", values);

        string response = null;

        if (MODE == "CURL")
        {
            response = Curl(JsonConvert.SerializeObject(values));
        }

        return VerifyHash(response);
    }

    public dynamic VerifyHash(string response)
    {
        dynamic responseArray;

        try
        {
            responseArray = JsonConvert.DeserializeObject(response);
        }
        catch
        {
            responseArray = response;
        }

        if (responseArray == null && !(response is JObject))
        {
            return response;
        }

        if (responseArray is JObject)
        {
            responseArray.credentials = JsonConvert.DeserializeObject(responseArray.credentials.ToString());
            responseArray.data = JsonConvert.DeserializeObject(responseArray.data.ToString());
        }

        if (responseArray.credentials != null)
        {
            var hash = Hash(JsonConvert.SerializeObject(responseArray.data));

            if (responseArray.credentials.hash == hash)
            {
                return responseArray.data;
            }
            else
            {
                return new { code = 9511, message = "Verification error", hash, hash_received = responseArray.credentials.hash };
            }
        }

        return ((JObject)responseArray).Properties().ToDictionary(p => p.Name, p => p.Value);
    }

    public string Curl(string parameters)
    {
        using (var client = new HttpClient())
        {
            var url = $"http{(SSL ? "s" : "")}://{URL}";
            var content = new StringContent(parameters, Encoding.UTF8, "application/json");
            var response = client.PostAsync(url, content).Result;

            if (!response.IsSuccessStatusCode)
            {
                return JsonConvert.SerializeObject(new { error = 9510, message = $"HTTP Error {response.StatusCode}" });
            }

            return response.Content.ReadAsStringAsync().Result;
        }
    }

    private string Hash(string args)
    {
        Out("TO BE HASHED DATA", args);
        using (var sha512 = new HMACSHA512(Encoding.UTF8.GetBytes(KEY)))
        {
            var hashBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(args));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }

    private void Out(string name, dynamic output)
    {
        if (!DEBUG)
        {
            return;
        }

        Console.WriteLine($"{name}: '{output}'");
    }
}
