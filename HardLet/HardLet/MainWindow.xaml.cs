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
        private byte btnstate = 0;
        private bool connected = false;
        private static SerialPort mySerialPort;

        public MainWindow()
        {
            InitializeComponent();
            string[] ports = SerialPort.GetPortNames();
            foreach (string port in ports)
            {
                Console.WriteLine(port);
            }
            COMList.ItemsSource = SerialPort.GetPortNames();
        }

        private void Connection_Click(object sender, RoutedEventArgs e)
        {
            if (connected)
            {
                connected = false;
                mySerialPort.Close();
            }
            else
            {
                connected = true;
                mySerialPort = new SerialPort(COMList.SelectedItem.ToString(), 115200);
                try
                {
                    mySerialPort.Open();
                    mySerialPort.DataReceived += new SerialDataReceivedEventHandler(SerialDataRead);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.ToString(), "COM port not selected");
                }
            }
        }

        void SerialDataRead(object sender, SerialDataReceivedEventArgs e)
        {
            String comdata = mySerialPort.ReadLine();
            Dispatcher.Invoke((Action)(() => Console.WriteLine("Data\n" + comdata + "\n")));
        }

        private void One_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Two_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Three_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Four_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Six_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
