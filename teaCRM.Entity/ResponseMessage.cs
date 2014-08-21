namespace teaCRM.Entity
{
    public class ResponseMessage
    {
        private string _action;
        private bool _status;
        private string _msg;


        public string Action
        {
            get { return _action; }
            set { _action = value; }
        }

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