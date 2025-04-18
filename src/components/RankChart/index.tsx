import { VisitorChartStyled } from "./styled";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Empty } from "antd";
import clsx from "clsx";
import TitleCompo from "../TitleCompo";
import api from "@/utill/api";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  title: string;
  likes: [];
  viewCount: number;
  score: number;
};

const RankChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  const getRank = async () => {
    try {
      // 랭킹 요청
      const response = await api.get("/novels/rankings");
      const data: ChartData[] = response.data;

      // 점수 기준으로 내림차순 정렬 후 상위 5개만
      const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);

      const labels = top5.map((item) => item.title);

      const updatedData = {
        labels,
        datasets: [
          {
            type: "bar" as const,
            label: "점수",
            data: top5.map((item) => item.score),
            backgroundColor: "#8884d8",
          },
          {
            type: "line" as const,
            label: "좋아요 수",
            data: top5.map((item) => item.likes.length),
            borderColor: "#82ca9d",
            backgroundColor: "#82ca9d",
            tension: 0, // 직선으로
          },
          {
            type: "line" as const,
            label: "조회수",
            data: top5.map((item) => item.viewCount),
            borderColor: "#ffc658",
            backgroundColor: "#ffc658",
            tension: 0,
          },
        ],
      };

      setChartData(updatedData);
    } catch (e) {
      console.error("랭킹 데이터 불러오기 실패:", e);
      setChartData(null);
    }
  };

  useEffect(() => {
    getRank();
  }, []);

  const options = {
    responsive: true, // 크기 자동 조절
    maintainAspectRatio: false, // 크기 비율 유지하지 않음
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          max: 5,
        },
      },
      y1: {
        position: "right" as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          stepSize: 5,
          max: 40,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    barThickness: 25,
    categoryPercentage: 0.8,
    barPercentage: 0.8,
  };

  return (
    <VisitorChartStyled className={clsx("visitor-wrap")}>
      <TitleCompo title="대시보드" />
      <div style={{ padding: "30px" }}>
        <div className="visitor-title">랭킹 통계</div>

        <div
          className="visitor-chart"
          style={{ height: "400px", width: "100%" }}
        >
          {chartData ? (
            <Chart type="bar" data={chartData} options={options} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </VisitorChartStyled>
  );
};

export default RankChart;
