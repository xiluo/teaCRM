namespace teaCRM.Entity
{
    public class ResponseMessage
    {
        private bool _status;
        private string _msg;

        public bool Status
        {
            get { return _status; }
            set { _status = value; }
        }

        public string Msg
        {
            get { return _msg; }
            set { _msg = value; }
        }
    }
}