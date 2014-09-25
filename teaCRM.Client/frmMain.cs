using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Windows.Forms.VisualStyles;
using teaCRM.Common;


namespace UCsoft.Client
{
    public partial class frmMain : Form
    {
       
        public frmMain()
        {
            InitializeComponent();
        }

     
        private void btnEn_Click(object sender, EventArgs e)
        {
            MessageBox.Show(
                "dgB6AGUAZwBtAEcATgBUAE4AVgBhAFUAWgAyAE8AZQBIAEIAbQBWAEkAYgB6ADIAawBlAE0ANgAzAEgAMQBaAA==".Length.ToString());

            txtRes.Text = DESEncrypt.Encrypt(txtSrc.Text);
        }

        private void btnDe_Click(object sender, EventArgs e)
        {
            txtRes.Text = DESEncrypt.Decrypt(txtSrc.Text);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            txtUni.Text = Utils.ChineseToUnicode16(txtHz.Text);
        }

        private void btnGenCompNum_Click(object sender, EventArgs e)
        {
            var compNum = RandomHelper.GetComoanyNumber();
            txtcompNum.Text = compNum;
        }
    }
}