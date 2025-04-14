import { VisitorChartStyled } from "./styled";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Empty } from "antd";
import api from "@/utill/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import clsx from "clsx";

// Chart.js에 필요한 스케일과 요소들 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;

const VisitorChart = () => {
  const today = dayjs();
  const oneWeekAgo = today.subtract(6, "day"); // 오늘 포함 7일

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    oneWeekAgo,
    today,
  ]);
  const [chartData, setChartData] = useState<any>(null);

  // 날짜 변경 or 초기 진입 시 데이터 요청
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");

      // axios 요청(시작 날짜, 마지막 날짜 담아서 보냄->시작날짜~마지막날짜에 몇명씩 방문했는지 보내주기)
      api
        .get("/visitor", { params: { startDate, endDate } })
        .then((res) => {
          const { data } = res;
          // 날짜 라벨
          const labels = data.map((item: any) => item.date);

          // 방문자 수 데이터
          const visitorData = data.map((item: any) => item.visitorCount);

          const updatedData = {
            labels,
            datasets: [
              {
                label: "방문자 수",
                data: visitorData,
                backgroundColor: "#A0AEC0",
              },
            ],
          };

          setChartData(updatedData);
        })
        .catch((e) => {
          console.error("데이터 로드 실패: ", e);
          setChartData(null);
        });
    }
  }, [dateRange]);

  const options = {
    scales: {
      x: {
        // X축의 카테고리 간 간격 설정
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    barThickness: 25, // 막대 너비
    categoryPercentage: 0.8, // 각 카테고리 내에서 차지하는 비율
    barPercentage: 0.8, // 막대 간 간격 비율 조정
  };

  return (
    <VisitorChartStyled className={clsx("visitor-wrap")}>
      <div style={{ padding: "30px" }}>
        <RangePicker
          value={dateRange}
          onChange={(dates) => {
            if (dates) {
              setDateRange(dates as [Dayjs, Dayjs]);
            }
          }}
        />

        <div className="visitor-title">방문자 통계</div>

        <div className="visitor-chart">
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </VisitorChartStyled>
  );
};

export default VisitorChart;
