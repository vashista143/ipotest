import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const [ipoData, setIpoData] = useState([]);
  const [gainCount, setGainCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [noCmpOrIpoPrice, setNoCmpOrIpoPrice] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [newListedCount, setNewListedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [hoveredSegment, setHoveredSegment] = useState(null);

  const handleMouseEnter = (e, label) => {
    const { clientX, clientY } = e;
    setHoveredSegment({ label, x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

useEffect(() => {
  fetch(`${import.meta.env.VITE_backendurl}/api`, {
    method: "GET",
    credentials: "include",
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Unauthorized or server error");
      }
      return res.json();
    })
    .then(data => {
      setIpoData(data);
    })
    .catch(err => {
      console.error(err);
      navigate('/login')
    });
}, []);

  useEffect(() => {
    let gains = 0;
    let losses = 0;
    let noData = 0;
    let upcoming = 0;
    let ongoing = 0;
    let listed = 0;

    ipoData.forEach((ipo) => {
      if (ipo.status === 'Upcoming') {
        upcoming++;
      } else if (ipo.status === 'Ongoing') {
        ongoing++;
      } else if (ipo.status === 'Listed' || ipo.status === 'New Listed') {
        listed++;
      }
    });

    setUpcomingCount(upcoming);
    setOngoingCount(ongoing);
    setNewListedCount(listed);

    ipoData.forEach((ipo) => {
      const cmp = parseFloat(ipo.cmp);
      const ipoPrice = parseFloat(ipo.ipoPrice);

      if (isNaN(cmp) || isNaN(ipoPrice)) {
        noData++;
        return;
      }

      if (cmp > ipoPrice) {
        gains++;
      } else if (cmp < ipoPrice) {
        losses++;
      }
    });

    setGainCount(gains);
    setLossCount(losses);
    setNoCmpOrIpoPrice(noData);
    setTotalCount(ipoData.length);
  }, [ipoData]);
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className='text-2xl font-semibold text-gray-800 pt-5'>Dashboard</h1>
      <div className="flex h-[400px]">
        <div className="w-1/3 text-xl relative border-r border-gray-300 ">
          <h1 className='text-xl font-semibold text-gray-800 pt-5'>IPO Dashboard India</h1>
          <div className="flex items-center space-x-1">
            <span className='font-extralight'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[12px] w-[12px] text-[#149D52]" fill="currentColor" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
            </span>
            <span className='text-[#149D52] text-[12px]'>{gainCount}</span>
            <p className=" text-[12px] leading-[12px] text-gray-500 font-extralight font-[Poppins]">IPO in gain</p>
          </div>
          <div className='absolute right-5 top-30'>
            <div className="relative w-[220px] h-[220px]">
              <svg className="absolute top-0 left-0" width="220" height="220">
                <circle
                  cx="110"
                  cy="110"
                  r="105"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="507 121"
                  transform="rotate(-90 110 110)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[200px] h-[200px] bg-[#F99C30] rounded-full flex items-center justify-center text-white font-bold">
                <div className="flex flex-col items-center text-white font-bold">
                  <span className="text-3xl">{totalCount}</span>
                  <span className="text-[18px] leading-[12px] font-extralight font-[Poppins]">Total IPO</span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute left-[60px] top-[80px]'>
            <div className="relative w-[120px] h-[120px]">
              <svg className="absolute top-0 left-0" width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="#6463D6"
                  strokeWidth="2"
                  strokeDasharray="237 107"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[100px] h-[100px] bg-[#6463D6] rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center text-white font-bold">
                  <span className="text-[25px]">{lossCount}</span>
                  <span className="text-[14px] leading-[12px] font-extralight font-[Poppins]">IPO in loss</span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute left-[-10px] top-[250px]'>
            <div className="relative w-[150px] h-[150px]">
              <svg className="absolute top-0 left-0" width="150" height="150">
                <circle
                  cx="75"
                  cy="75"
                  r="70"
                  fill="none"
                  stroke="#2FBFDE"
                  strokeWidth="2"
                  strokeDasharray="294 146"
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[130px] h-[130px] bg-[#2FBFDE] rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center text-white font-bold text-center">
                  <span className="text-[25px]">{gainCount}</span>
                  <span className="text-[18px] leading-[12px] font-extralight font-[Poppins]">IPO in gain</span>
                </div>
              </div>
            </div>
          </div>





        </div>
        <div className="w-1/3 border-r border-gray-300 pl-5">
          <p className='text-xl font-semibold text-gray-800 pt-5'>Quick links</p>
          <p className=' text-[12px] text-gray-500 font-extralight font-[Poppins]'>Adipiscing elit, sed do eiusmod tempor</p>
          <div>
            <ul className='pt-8 '>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="https://www.nseindia.com/_next/image?url=%2Fnext-assets%2Fimages%2FGroup-5414.png&w=96&q=75" alt="NSE Logo" className=""/></div><span><p className='pl-2'>NSE India</p></span></div><div className='pr-5'><a href='https://www.nseindia.com/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="https://www.bseindia.com/include/images/spbse.png" alt="BSE Logo" className=""/></div><span><p className='pl-2'>BSE India</p></span></div><div className='pr-5'><a href='https://www.bseindia.com/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="data:image/jpeg;base64,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" alt="SEBI Logo" className=""/></div><span><p className='pl-2'>SEBI</p></span></div><div className='pr-5'><a href='https://www.sebi.gov.in/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAQlBMVEVHcEwAZqAAZqAAZqAAZqAAZqAAYqQWcJMxhnRTpzBWqidInUlNpSdirkaEvXJDoRT////f7dq52LCZx4qx1Kat0aF+H9L2AAAABnRSTlMACZHj/zPhGhG8AAAApUlEQVR4Ab2ThQ0DMRAEz8wU6L/V7DNbnJGMYwYiYlzIC4IzAko+oIiYfIQRf5acxLMUJDvMUmtpjNFgKW7SWOcHQrAGxlirV6mDdwveD+EgJxHHAC4yOZdTSRn6ImNttdYXQo43sr4/CN/ayl3PUobwR+lyjkOICFcZ4xaO0i84cJY4b4ADD2MLuE3qqSA1GK9ObvIAxEL/mXQfWPdpdh917zv8AO19E4Kxa2UlAAAAAElFTkSuQmCC" alt="Money Control Logo" className=""/></div><span><p className='pl-2'>Money Control</p></span></div><div className='pr-5'><a href='https://www.moneycontrol.com/' className='text-gray-500 '>Visit Now</a></div></li>
            </ul>
          </div>
        </div>
        <div className="w-1/3 text-white text-xl">
<div className="w-full px-6">
  <div className="flex justify-between items-start">
    <div>
      <p className="text-xl font-semibold text-gray-800 pt-5">Main Board IPO</p>
      <p className="text-[12px] text-gray-500 font-light">From 01 Jan 2024</p>
    </div>
    <div className='pt-5'>
    <button className="text-sm text-blue-500 border border-blue-500 rounded px-3 py-1 hover:bg-blue-50">
      View Report
    </button>
    </div>
  </div>
<div className="relative flex justify-center">
      <svg width="200" height="200" viewBox="0 0 36 36" className="rotate-[-90deg]">
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#E5E7EB"
    strokeWidth="3"
  />
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#5A6ACF"
    strokeWidth="5"
    strokeDasharray="20.94 41.89"
    strokeDashoffset="0"
    onMouseEnter={(e) => handleMouseEnter(e, `${upcomingCount}`)}
    onMouseLeave={handleMouseLeave}
  />
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#8593ED"
    strokeWidth="4.5"
    strokeDasharray="20.94 41.89"
    strokeDashoffset="-20.94"
    onMouseEnter={(e) => handleMouseEnter(e, `${newListedCount}`)}
    onMouseLeave={handleMouseLeave}
  />
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#C7CEFF"
    strokeWidth="4"
    strokeDasharray="20.95 41.88"
    strokeDashoffset="-41.88"
    onMouseEnter={(e) => handleMouseEnter(e, `${ongoingCount}`)}
    onMouseLeave={handleMouseLeave}
  />
</svg>

{/* 💬 Tooltip (unchanged) */}
{hoveredSegment && hoveredSegment.label && (
  <div
    className="fixed z-50 text-xs leading-[25px] text-[15px] bg-[#37375C] text-white w-[140px] h-[109px] border border-[#37375C] rounded shadow px-4 py-4"
    style={{ top: hoveredSegment.y + 10, left: hoveredSegment.x + 10 }}>
    Afternoon<br/> IPO NSE & BSE <br/>
    {hoveredSegment.label}
  </div>
)}
    </div>

<div className='pt-5 flex gap-x-6'>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      Upcoming<br />{upcomingCount}
    </p>
  </div>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      New Listed<br />{newListedCount}
    </p>
  </div>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      Ongoing<br />{ongoingCount}
    </p>
  </div>
</div>

</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
