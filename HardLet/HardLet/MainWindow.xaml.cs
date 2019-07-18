using System;
using System.Collections.Generic;
using System.Windows;
using System.IO.Ports;

namespace HardLet
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        /// <summary>
        /// For Serial ports
        /// </summary>
        private bool connected = false;
        string comdata;
        private static SerialPort mySerialPort;

        /// <summary>
        /// For 6 pin button
        /// </summary>
        private int value = 1;
        private bool oneset = false;
        private bool twoset = false;
        private bool threeset = false;
        private bool fourset = false;
        private bool fiveset = false;
        private bool sixset = false;
        public IDictionary<string,int> buttonseq = new Dictionary<string, int>()
        {
            {"1",0},
            {"2",0},
            {"3",0},
            {"4",0},
            {"5",0},
            {"6",0},
        };
        String message;

        public MainWindow()
        {
            InitializeComponent();
            COMList.ItemsSource = SerialPort.GetPortNames();
        }

        /// <summary>
        /// Serial Connection Button
        /// </summary>
        private void Connection_Click(object sender, RoutedEventArgs e)
        {
            if (COMList.SelectedItem != null)
            {
                if (connected)
                {
                    //reset button parameters
                    one.IsEnabled = true;
                    two.IsEnabled = true;
                    three.IsEnabled = true;
                    four.IsEnabled = true;
                    five.IsEnabled = true;
                    six.IsEnabled = true;
                    for (int i = 1; i < buttonseq.Count + 1; i++)
                    {
                        buttonseq[i.ToString()] = 1;
                    }
                    one.Content = "";
                    two.Content = "";
                    three.Content = "";
                    four.Content = "";
                    five.Content = "";
                    six.Content = "";
                    SenderPrivateKey.Content = "";
                    value = 1;
                    oneset = false;
                    twoset = false;
                    threeset = false;
                    fourset = false;
                    fiveset = false;
                    sixset = false;

                    //send value to notify user and arduino close connection
                    SerialDataSend(buttonseq);
                    connected = false;
                    Connection.Content = "Connect";
                    mySerialPort.Close();
                    MessageBox.Show("COM port disconnected", "COM port Status");

                    for (int i = 1; i < buttonseq.Count + 1; i++)
                    {
                        buttonseq[i.ToString()] = 0;
                    }
                }
                else
                {
                    connected = true;
                    one.IsEnabled = false;
                    two.IsEnabled = false;
                    three.IsEnabled = false;
                    four.IsEnabled = false;
                    five.IsEnabled = false;
                    six.IsEnabled = false;
                    try
                    {
                        Connection.Content = "Disconnect";
                        for (int i = 1; i < buttonseq.Count+1; i++)
                        {
                            Console.WriteLine(buttonseq[i.ToString()]);
                        }

                        //serial connect
                        mySerialPort = new SerialPort(COMList.SelectedItem.ToString(), 115200);
                        mySerialPort.Open();
                        MessageBox.Show("COM port connected", "COM port Status");

                        //Send information
                        SerialDataSend(buttonseq);

                        //begin serial reading
                        mySerialPort.DataReceived += new SerialDataReceivedEventHandler(SerialDataRead);
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.ToString(), "COM port not selected");
                    }
                }
            }
            else
            {
                MessageBox.Show("COM port not selected", "COM port status");
            }
        }

        /// <summary>
        /// Event for serial reading with multithreading
        /// </summary>
        void SerialDataRead(object sender, SerialDataReceivedEventArgs e)
        {
            if(mySerialPort.IsOpen)
            {
                comdata = mySerialPort.ReadLine();
                Dispatcher.Invoke(() => Console.Write("Data: " + comdata + "\n"));
                if (comdata.Substring(0,13) == message + "private")
                {
                    string privatekey = comdata.Substring(13, 32) + System.Environment.NewLine + comdata.Substring(comdata.Length - 33, 32);
                    Dispatcher.InvokeAsync((Action)(() => SenderPrivateKey.Content = privatekey));
                }
                else if (comdata.Substring(0, 12) == message + "public")
                {
                    string publickey = comdata.Substring(12, 32) + System.Environment.NewLine + comdata.Substring(comdata.Length - 33, 32);
                    Console.WriteLine(publickey);
                    Dispatcher.InvokeAsync((Action)(() => SenderPublicKey.Content = publickey));
                }
            }
        }

        /// <summary>
        /// Sends the pin data to the hardware wallet
        /// </summary>
        void SerialDataSend(IDictionary<string, int> pinseq)
        {
            if (mySerialPort.IsOpen)
            {
                message = "{0}{1}{2}{3}{4}{5}";
                message = String.Format(message, pinseq["1"], pinseq["2"], pinseq["3"], pinseq["4"], pinseq["5"], pinseq["6"]);
                mySerialPort.Write(message);
            }
        }
        /// <summary>
        /// User Interface buttons for 6 pin input
        /// </summary>
        private void One_Click(object sender, RoutedEventArgs e)
        {
            if (oneset)
            {
                oneset = false;
                one.Content = "";
                buttonseq["1"] = 0;
                value--;
            }
            else
            {
                oneset = true;
                one.Content = value.ToString();
                buttonseq["1"] = value;
                value++;
            }
        }
        private void Two_Click(object sender, RoutedEventArgs e)
        {
            if (twoset)
            {
                twoset = false;
                two.Content = "";
                buttonseq["2"] = 0;
                value--;
            }
            else
            {
                twoset = true;
                two.Content = value.ToString();
                buttonseq["2"] = value;
                value++;
            }
        }
        private void Three_Click(object sender, RoutedEventArgs e)
        {
            if (threeset)
            {
                threeset = false;
                three.Content = "";
                buttonseq["3"] = 0;
                value--;
            }
            else
            {
                threeset = true;
                three.Content = value.ToString();
                buttonseq["3"] = value;
                value++;
            }
        }
        private void Four_Click(object sender, RoutedEventArgs e)
        {
            if (fourset)
            {
                fourset = false;
                four.Content = "";
                buttonseq["4"] = 0;
                value--;
            }
            else
            {
                fourset = true;
                four.Content = value.ToString();
                buttonseq["4"] = value;
                value++;
            }
        }
        private void Five_Click(object sender, RoutedEventArgs e)
        {
            if (fiveset)
            {
                fiveset = false;
                five.Content = "";
                buttonseq["5"] = 0;
                value--;
            }
            else
            {
                fiveset = true;
                five.Content = value.ToString();
                buttonseq["5"] = value;
                value++;
            }
        }
        private void Six_Click(object sender, RoutedEventArgs e)
        {
            if (sixset)
            {
                sixset = false;
                six.Content = "";
                buttonseq["6"] = 0;
                value--;
            }
            else
            {
                sixset = true;
                six.Content = value.ToString();
                buttonseq["6"] = value;
                value++;
            }
        }
    }
}
