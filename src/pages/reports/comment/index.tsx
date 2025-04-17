import ReportManagement from "@/components/ReportManagement";
import { useEffect, useState } from "react";
import api from "@/utill/api";

const CommentReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const res = await api.get("/reports");
      const filtered = res.data.filter(
        (report: any) => report.target_type === "comment"
      );
      setData(filtered); // target_type이 "comment"인 것만 저장
    };
    getReports();
  }, []);

  return <ReportManagement data={data} target_type="comment" />;
};

export default CommentReports;
