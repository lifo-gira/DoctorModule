import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  CardHeader,
  CardBody,
  Avatar,
  Drawer,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";


const Report = ({ onDashboard, userId, onRegimeClick }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runningData, setRunningData] = useState([]);
  const [squatsData, setsquatsData] = useState([]);
  const [pushupsData, setpushupsData] = useState([]);
  const [pullupsData, setpullupsData] = useState([]);
  const [leghipData, setleghipData] = useState([]);
  const [patientDetails, setpatientDetails] = useState([]);
  const [report, setreport] = useState([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/patient-info/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPatients(data);
          console.log(data);
          // Extract only the "Running" data
          const newPatientDetailsData = data.PersonalDetails.PatientDetails;
          const newReportData = data.PersonalDetails.Reports;
          console.log(newReportData);
          setpatientDetails(newPatientDetailsData);
          setreport(newReportData);
          const runningExerciseData = data?.Exercises?.running.values || [];
          const squatsExerciseData = data?.Exercises?.squats.values || [];
          const pushupsExerciseData = data?.Exercises?.pushups.values || [];
          const pullupsExerciseData = data?.Exercises?.pullups.values || [];
          const leghipExerciseData = data?.Exercises?.LegHipRotation.values || [];
          setRunningData(runningExerciseData.map((value) => parseFloat(value)));
          setsquatsData(squatsExerciseData.map((value) => parseFloat(value)));
          setpushupsData(pushupsExerciseData.map((value) => parseFloat(value)));
          setpullupsData(pullupsExerciseData.map((value) => parseFloat(value)));
          setleghipData(leghipExerciseData.map((value) => parseFloat(value)));
        } else {
          setError(data.detail || "Failed to fetch patient information");
        }
      } catch (error) {
        setError("Error fetching patient information");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [userId]);

  useEffect(() => {
    setPatients(patients);
    setpatientDetails(patientDetails);
    setreport(report);
    console.log("UserId:", userId);
    console.log(report);
  }, [patients, patientDetails, report]);

  const combinedChartData = runningData.map((value, index) => ({
    name: ` ${index + 1}`,
    Running: value,
    Squats: squatsData[index],
    Pushups: pushupsData[index],
    Pullups: pullupsData[index],
    LegHipRotation: leghipData[index],
  }));

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: -3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: -2000,
      pv: -9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: -1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: -3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data4 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenheight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={`w-full h-full bg-gray-200`}>
      {screenWidth >= 1535 && (
        <div
          className={`w-full h-1/5 rounded-b-3xl flex flex-row bg-gradient-to-r from-cyan-200 to-cyan-400 py-2`}
        >
          <div className={`w-1/2 h-full px-8`}>
            <div className={`w-5/6 h-full  flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-2/3 h-full  text-start flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white">
                {patients.user_id}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                32 , {patientDetails.Gender}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                  ID: 123456
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>
          <div className={`w-1/2 h-full flex flex-col px-8`}>
            <div className={`w-5/6 h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white">
                {patients.doctor_assigned}
                </Typography>
                <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography>
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-5/6 h-1/3  flex ml-auto`}>
              <div className={`w-3/4 flex ml-auto justify-end items-center`} onClick={() => onRegimeClick(patients.patient_id)}>
                <Button className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  Assign Exercise
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 1535 && screenWidth >= 1180 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-row bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-1/5`}
        >
          <div className={`w-2/5 h-full px-8 `}>
            <div className={`w-full h-full flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-2/3 h-full  text-start flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white">
                {patients.user_id}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                32 , {patientDetails.Gender}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                  ID: 123456
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>
          <div
            className={`w-1/5 h-full px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography variant="h5" color="white" onClick={onDashboard}>
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-2/5 h-full px-8  flex flex-col`}>
            <div className={`w-full h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white">
                  {patients.doctor_assigned}
                </Typography>
                <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography>
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-full h-1/3  flex ml-auto`}>
              <div className={`w-3/4 flex ml-auto justify-center items-center`}>
                <div className={`w-3/4 flex ml-auto justify-end items-center`}
                onClick={() => onRegimeClick(patients.patient_id)}>
                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    Assign Exercise
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 1180 && screenWidth >= 950 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-80`}
        >
          <div
            className={`w-full h-1/6 px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography variant="h5" color="white" onClick={onDashboard}>
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-5/6 flex flex-row`}>
            <div className={`w-1/2 h-full px-8 `}>
              <div className={`w-full h-full flex flex-row`}>
                <div
                  className={`w-1/3 h-full flex items-center justify-center`}
                >
                  <Avatar
                    size="xxl"
                    alt="avatar"
                    variant="rounded"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    className="border border-white shadow-xl  ring-2 ring-white"
                  />
                </div>
                <div
                  className={`w-2/3 h-full  text-start flex flex-col justify-center`}
                >
                  <Typography variant="h5" color="white">
                  {patients.user_id}
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium"
                  >
                    32 , {patientDetails.Gender}
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium"
                  >
                    ID: 123456
                  </Typography>
                  <Typography
                    variant="h7"
                    color="white"
                    className="font-medium"
                  >
                    {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  </Typography>
                </div>
              </div>
            </div>

            <div className={`w-1/2 h-full px-8  flex flex-col`}>
              <div className={`w-full h-2/3  flex flex-row ml-auto`}>
                <div
                  className={`w-3/4 h-full  flex flex-col text-end justify-center`}
                >
                  <Typography variant="h4" color="white">
                  {patients.doctor_assigned}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="white"
                    className="font-medium"
                  >
                    Cardialogist
                  </Typography>
                </div>
                <div
                  className={`w-1/4 h-full  flex justify-center items-center`}
                >
                  <Avatar
                    size="xl"
                    alt="avatar"
                    variant="rounded"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    className="border border-white shadow-xl  ring-2 ring-white"
                  />
                </div>
              </div>

              <div className={`w-full h-1/3  flex ml-auto`}>
                <div
                  className={`w-3/4 flex ml-auto justify-center items-center`}
                >
                  <div
                    className={`w-3/4 flex ml-auto justify-end items-center`}
                    onClick={() => onRegimeClick(patients.patient_id)}
                  >
                    <Button className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                      Assign Exercise
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 950 && screenWidth >= 500 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-96`}
        >
          <div
            className={`w-full h-1/5 px-8  flex flex-col items-end justify-center`}
          >
            <ArrowUturnLeftIcon className="w-16 h-16" onClick={onDashboard} />
            <Typography variant="h5" color="white" onClick={onDashboard}>
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-2/5 px-8 `}>
            <div className={`w-full h-full flex flex-row`}>
              <div className={`w-1/3 h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-2/3 h-full  text-start flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white">
                {patients.user_id}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                32 , {patientDetails.Gender}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                  ID: 123456
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>

          <div className={`w-full h-2/5 px-8  flex flex-col`}>
            <div className={`w-full h-2/3  flex flex-row ml-auto`}>
              <div
                className={`w-3/4 h-full  flex flex-col text-end justify-center`}
              >
                <Typography variant="h4" color="white">
                {patients.doctor_assigned}
                </Typography>
                <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography>
              </div>
              <div className={`w-1/4 h-full  flex justify-center items-center`}>
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
            </div>

            <div className={`w-full h-1/3  flex ml-auto`}>
              <div className={`w-3/4 flex ml-auto justify-center items-center`}>
                <div className={`w-3/4 flex ml-auto justify-end items-center`} onClick={() => onRegimeClick(patients.patient_id)}>
                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    Assign Exercise
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {screenWidth < 500 && (
        <div
          className={`w-full  rounded-b-3xl flex flex-col  bg-gradient-to-r from-cyan-200 to-cyan-400 py-2 h-[40rem]`}
        >
          <div
            className={`w-full h-[5rem] px-8  flex flex-col items-center justify-center`}
          >
            <ArrowUturnLeftIcon className="w-12 h-12" onClick={onDashboard} />
            <Typography variant="h5" color="white" onClick={onDashboard}>
              Back to Dashboard
            </Typography>
          </div>
          <div className={`w-full h-[17.5rem] px-8 `}>
            <div
              className={`w-full h-full flex flex-col justify-center items-center`}
            >
              <div className={`w-full h-full flex items-center justify-center`}>
                <Avatar
                  size="xxl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-full h-full  text-center flex flex-col justify-center`}
              >
                <Typography variant="h5" color="white">
                {patients.user_id}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                32 , {patientDetails.Gender}
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                  ID: 123456
                </Typography>
                <Typography variant="h7" color="white" className="font-medium">
                {report.map((report, index) => (
                    <div key={index}>
                      {report && (
                        <div>
                          <span>Diagnosis {index + 1}: </span>
                          <span>{report}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-[17.5rem] px-8  flex flex-col items-center justify-center`}
          >
            <div
              className={`w-full h-2/3  flex flex-col justify-center items-center `}
            >
              <div
                className={`w-full h-full  flex justify-center items-center`}
              >
                <Avatar
                  size="xl"
                  alt="avatar"
                  variant="rounded"
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  className="border border-white shadow-xl  ring-2 ring-white"
                />
              </div>
              <div
                className={`w-full h-full  flex flex-col text-center justify-center`}
              >
                <Typography variant="h4" color="white">
                {patients.doctor_assigned}
                </Typography>
                <Typography variant="h6" color="white" className="font-medium">
                  Cardialogist
                </Typography>
              </div>
            </div>

            <div className={`w-full h-1/3 flex justify-center `}>
              <div className={`w-full flex  justify-center items-center`}>
                <div className={`w-full flex justify-center items-center`}
                onClick={() => onRegimeClick(patients.patient_id)}>
                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    Assign Exercise
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`w-full   ${
          screenWidth < 1180 ? "h-4/5 flex flex-col" : "h-4/5 flex flex-row"
        }`}
      >
        <div className={`h-full ${screenWidth < 1180 ? "w-full" : "w-1/2"}`}>
          <div className={`w-full h-2/5  py-2 px-3`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-8"
              >
                Pain Score
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-2/5 bg-gray-200 py-2 px-3`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-8"
              >
                Pain Score
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={data1}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area
                      type="monotone"
                      dataKey="amt"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-1/5  flex flex-row gap-4 px-3 py-2`}>
            <div className={`w-1/2 h-full`}>
              <Card className="bg-white w-full h-full flex flex-col p-4">
                <div className="h-1/4 flex flex-row justify-between items-center">
                  <Typography variant="h6" color="black" className="text-start">
                    Pain Score
                  </Typography>
                  <Typography variant="h7" color="black" className="text-start">
                    Left Leg
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-center h-3/4">
                  <Typography
                    variant="h3"
                    color="black"
                    className="text-start mt-[-2rem] "
                  >
                    33
                  </Typography>
                </div>
              </Card>
            </div>
            <div className={`w-1/2 h-full`}>
              <Card className="bg-white w-full h-full flex flex-col p-4">
                <div className="h-1/4 flex flex-row justify-between items-center">
                  <Typography variant="h6" color="black" className="text-start">
                    Pain Score
                  </Typography>
                  <Typography variant="h7" color="black" className="text-start">
                    Right Leg
                  </Typography>
                </div>
                <div className="flex flex-col justify-center items-center h-3/4">
                  <Typography
                    variant="h3"
                    color="black"
                    className="text-start mt-[-2rem] "
                  >
                    33
                  </Typography>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div
          className={` h-full flex flex-col ${
            screenWidth < 1180 ? "w-full" : "w-1/2"
          }`}
        >
          <div className={`w-full h-1/2 px-2 py-2`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col gap-2 pt-2"
            >
              <div className="w-full flex flex-col">
                <Typography
                  variant="h6"
                  color="black"
                  className="flex text-start px-5"
                >
                  Sugar Level
                </Typography>
                <Typography
                  variant="h7"
                  color="black"
                  className="flex text-start px-5"
                >
                  220 mg/dl
                </Typography>
              </div>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    width={500}
                    height={400}
                    data={data2}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          <div className={`w-full h-1/2 px-2 py-2`}>
            <Card
              color="transparent"
              shadow={true}
              className="w-full h-full bg-white flex flex-col pt-2"
            >
              <Typography
                variant="h6"
                color="black"
                className="flex text-start px-5"
              >
                Patient Analytics
              </Typography>
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={combinedChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Running" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Squats" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Pushups" stroke="#ff7300" />
                    <Line type="monotone" dataKey="Pullups" stroke="#0088aa" />
                    <Line
                      type="monotone"
                      dataKey="LegHipRotation"
                      stroke="#FF0000"
                    />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
