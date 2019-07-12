using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO.Ports;
using System.Threading;

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

        public MainWindow()
        {
            InitializeComponent();
            COMList.ItemsSource = SerialPort.GetPortNames();
        }

        private void Connection_Click(object sender, RoutedEventArgs e)
        {
            if (COMList.SelectedItem != null)
            {
                if (connected)
                {
                    connected = false;
                    Connection.Content = "Connect";
                    mySerialPort.Close();
                    MessageBox.Show("COM port disconnected", "COM port Status");
                }
                else
                {
                    connected = true;
                    try
                    {
                        Connection.Content = "Disconnect";
                        for (int i = 1; i < buttonseq.Count+1; i++)
                        {
                            Console.WriteLine(buttonseq[i.ToString()]);
                        }
                        mySerialPort = new SerialPort(COMList.SelectedItem.ToString(), 115200);
                        mySerialPort.Open();
                        MessageBox.Show("COM port connected", "COM port Status");
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

        void SerialDataRead(object sender, SerialDataReceivedEventArgs e)
        {
            comdata = mySerialPort.ReadLine();
            Dispatcher.Invoke((Action)(() => Console.Write("Data: " + comdata + "\n")));
        }

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
