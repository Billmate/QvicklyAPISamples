using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BillmateAPI
{
    public class BillmateException : ApplicationException
    {
        private string faultString = "";
        private string faultCode = "0";
        private string faultLogs = "";
        public string ErrorMessage { get { return this.faultString; } set { this.faultString = value; } }
        public string ErrorCode { get { return this.faultCode; } set { this.faultCode = value; } }
        public string ErrorLogs { get { return this.faultLogs; } set { this.faultLogs = value; } }
        public BillmateException() { }

        public BillmateException(string errorCode, string errorMessage)
            : base(errorCode + errorMessage)
        {
            this.faultCode = errorCode;
            this.faultString = errorMessage;
        }
        public BillmateException(string errorMessage)
            : base(errorMessage)
        {
            this.faultString = errorMessage;
        }
        public BillmateException(string errorCode, string errorMessage, string errorLogs)
            : base(errorCode + errorMessage + errorLogs)
        {
            this.faultCode = errorCode;
            this.faultString = errorMessage;
            this.faultLogs = errorLogs;
        }
    }
}
