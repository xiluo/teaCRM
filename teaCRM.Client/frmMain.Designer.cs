namespace UCsoft.Client
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtRes = new System.Windows.Forms.TextBox();
            this.btnEn = new System.Windows.Forms.Button();
            this.btnDe = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.txtSrc = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.txtUni = new System.Windows.Forms.TextBox();
            this.txtHz = new System.Windows.Forms.TextBox();
            this.btnGenCompNum = new System.Windows.Forms.Button();
            this.txtcompNum = new System.Windows.Forms.TextBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.txtRes);
            this.groupBox1.Controls.Add(this.btnEn);
            this.groupBox1.Controls.Add(this.btnDe);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.txtSrc);
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(260, 203);
            this.groupBox1.TabIndex = 1;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "测试加密解密算法";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(11, 137);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(41, 12);
            this.label2.TabIndex = 6;
            this.label2.Text = "结果：";
            // 
            // txtRes
            // 
            this.txtRes.Location = new System.Drawing.Point(58, 134);
            this.txtRes.Multiline = true;
            this.txtRes.Name = "txtRes";
            this.txtRes.Size = new System.Drawing.Size(196, 53);
            this.txtRes.TabIndex = 5;
            // 
            // btnEn
            // 
            this.btnEn.Location = new System.Drawing.Point(58, 99);
            this.btnEn.Name = "btnEn";
            this.btnEn.Size = new System.Drawing.Size(49, 23);
            this.btnEn.TabIndex = 4;
            this.btnEn.Text = "加密";
            this.btnEn.UseVisualStyleBackColor = true;
            this.btnEn.Click += new System.EventHandler(this.btnEn_Click);
            // 
            // btnDe
            // 
            this.btnDe.Location = new System.Drawing.Point(124, 99);
            this.btnDe.Name = "btnDe";
            this.btnDe.Size = new System.Drawing.Size(59, 23);
            this.btnDe.TabIndex = 2;
            this.btnDe.Text = "解密";
            this.btnDe.UseVisualStyleBackColor = true;
            this.btnDe.Click += new System.EventHandler(this.btnDe_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(11, 36);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(41, 12);
            this.label1.TabIndex = 1;
            this.label1.Text = "原文：";
            // 
            // txtSrc
            // 
            this.txtSrc.Location = new System.Drawing.Point(58, 33);
            this.txtSrc.Multiline = true;
            this.txtSrc.Name = "txtSrc";
            this.txtSrc.Size = new System.Drawing.Size(196, 60);
            this.txtSrc.TabIndex = 0;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(6, 71);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(97, 23);
            this.button1.TabIndex = 2;
            this.button1.Text = "测试汉子编码";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.label3);
            this.groupBox2.Controls.Add(this.txtUni);
            this.groupBox2.Controls.Add(this.txtHz);
            this.groupBox2.Controls.Add(this.button1);
            this.groupBox2.Location = new System.Drawing.Point(301, 12);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(376, 100);
            this.groupBox2.TabIndex = 3;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "编码转换";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(7, 47);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(53, 12);
            this.label4.TabIndex = 6;
            this.label4.Text = "编码后：";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(7, 21);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(53, 12);
            this.label3.TabIndex = 5;
            this.label3.Text = "编码前：";
            // 
            // txtUni
            // 
            this.txtUni.Location = new System.Drawing.Point(94, 44);
            this.txtUni.Name = "txtUni";
            this.txtUni.Size = new System.Drawing.Size(276, 21);
            this.txtUni.TabIndex = 4;
            // 
            // txtHz
            // 
            this.txtHz.Location = new System.Drawing.Point(94, 17);
            this.txtHz.Name = "txtHz";
            this.txtHz.Size = new System.Drawing.Size(276, 21);
            this.txtHz.TabIndex = 3;
            // 
            // btnGenCompNum
            // 
            this.btnGenCompNum.Location = new System.Drawing.Point(301, 138);
            this.btnGenCompNum.Name = "btnGenCompNum";
            this.btnGenCompNum.Size = new System.Drawing.Size(100, 23);
            this.btnGenCompNum.TabIndex = 4;
            this.btnGenCompNum.Text = "生成公司编号";
            this.btnGenCompNum.UseVisualStyleBackColor = true;
            this.btnGenCompNum.Click += new System.EventHandler(this.btnGenCompNum_Click);
            // 
            // txtcompNum
            // 
            this.txtcompNum.Location = new System.Drawing.Point(301, 178);
            this.txtcompNum.Name = "txtcompNum";
            this.txtcompNum.Size = new System.Drawing.Size(332, 21);
            this.txtcompNum.TabIndex = 5;
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(691, 459);
            this.Controls.Add(this.txtcompNum);
            this.Controls.Add(this.btnGenCompNum);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Name = "frmMain";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Form1";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtRes;
        private System.Windows.Forms.Button btnEn;
        private System.Windows.Forms.Button btnDe;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtSrc;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtUni;
        private System.Windows.Forms.TextBox txtHz;
        private System.Windows.Forms.Button btnGenCompNum;
        private System.Windows.Forms.TextBox txtcompNum;
    }
}

