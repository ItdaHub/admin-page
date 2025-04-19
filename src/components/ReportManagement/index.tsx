import { Button, Select, Table, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReportManageStyled } from "./styled";
import clsx from "clsx";
import TitleCompo from "../TitleCompo";
import api from "@/utill/api";
import type { ColumnsType } from "antd/es/table";

interface ReportData {
  id: number;
  content: string;
  reason: string;
  reporterId: string;
  created_at: string;
  reported_user_id: number;
  // status: "pending" | "processed"; // 신고 상태 추가
}

interface Props {
  data: ReportData[];
  target_type: "comment" | "chapter";
}

const ReportManagement = ({ data, target_type }: Props) => {
  const router = useRouter();

  const [report, setReport] = useState<ReportData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [order, setOrder] = useState<"DESC" | "ASC">("DESC");

  // 신고 데이터
  useEffect(() => {
    setReport(data);
    console.log("받아온 신고 데이터 (ReportManagement):", data);
  }, [data]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log(newSelectedRowKeys);
    console.log(data);
  };

  // 신고 추가
  const handleReportAdd = async () => {
    // // 중복 신고 확인 // 신고 상태를 추가 할 경우 주석 해제
    // const duplicateReports = report.filter(
    //   (item) => selectedRowKeys.includes(item.id) && item.status === "processed"
    // );

    // if (duplicateReports.length > 0) {
    //   message.error("이미 신고가 처리된 항목입니다.");
    //   return; // 중복 신고 방지
    // }

    // 선택된 신고 항목 필터링
    const selectedReports = report.filter((item) =>
      selectedRowKeys.includes(item.id)
    );

    const countMap: { [key: number]: number } = {};

    // 신고당한 유저 ID 기준으로 countMap 구성
    selectedReports.forEach((item) => {
      const reportedUserId = item.reported_user_id;

      if (reportedUserId) {
        console.log(`\n📌 현재 신고 대상 ID: ${reportedUserId}`);

        // countMap에 값 추가 또는 누적
        countMap[reportedUserId] = (countMap[reportedUserId] || 0) + 1;

        console.log("✅ 갱신된 countMap 상태:", { ...countMap });
      }
    });

    // [{ reported_user_id, count }] 형식으로 변환
    const reportCounts = Object.entries(countMap).map(([id, count]) => ({
      reported_user_id: Number(id),
      count,
    }));

    try {
      // 서버에 신고 카운트 전송
      const res = await api.post("/users/report-counts", {
        counts: reportCounts,
      });

      // // 신고 상태 업데이트 (처리된 항목으로 변경)
      // const updatedReport = report.map((item) =>
      //   selectedRowKeys.includes(item.id)
      //     ? { ...item, status: "processed" } // 선택된 신고 항목 상태 변경
      //     : item
      // );

      // setReport(updatedReport); // 상태 업데이트
      if (res.status === 204) {
        message.success("신고 횟수가 성공적으로 반영되었습니다.");
        setSelectedRowKeys([]);
      }
    } catch (error) {
      console.error("신고 추가 실패:", error);
      message.error("신고 추가 중 문제가 발생했습니다.");
    }
  };

  // 신고 목록 선택 삭제
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((id) => api.delete(`/reports/${id}`))
      );
      const filtered = report.filter(
        (item: ReportData) => !selectedRowKeys.includes(item.id)
      );
      message.success("선택된 신고가 삭제되었습니다.");
      setReport(filtered);
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("삭제 중 에러 발생:", err);
      message.error("삭제 중 오류가 발생했습니다.");
    }
  };

  // 상세페이지 이동
  const handleDetailClick = (id: number) => {
    router.push(`/reports/${target_type}/${id}`);
  };

  const columns: ColumnsType<ReportData> = [
    {
      key: "num",
      title: "번호",
      dataIndex: "num",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "신고 이유", dataIndex: "reason", key: "reason" },
    {
      title: "신고 대상",
      dataIndex: "reported_content",
      key: "reported_content",
      render: (text: string) => text || "내용 없음",
    },
    {
      title: "신고자",
      dataIndex: "reporterId",
      key: "reporterId",
      render: (_: any, record: any) =>
        record?.reporter?.nickname || record?.reporter?.name || "알 수 없음",
    },
    {
      title: "신고일",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a: ReportData, b: ReportData) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    },
  ];

  // 테이블 rowSelection 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  // 정렬 적용
  useEffect(() => {
    const sorted = [...data].sort((a, b) =>
      order === "DESC"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    setReport(sorted);
  }, [data, order]);

  // 정렬 옵션
  const sortOptions = [
    { value: "DESC", label: "최신순" },
    { value: "ASC", label: "오래된순" },
  ];

  return (
    <ReportManageStyled className={clsx("report-wrap")}>
      <div className="report-head">
        <TitleCompo title="신고 관리" />
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            type="primary"
            disabled={!selectedRowKeys.length}
            onClick={handleReportAdd}
          >
            신고 추가
          </Button>
          <Button
            type="primary"
            onClick={handleDelete}
            disabled={!selectedRowKeys.length}
          >
            신고 삭제
          </Button>
        </div>
      </div>
      <div className="manage-info">
        <div>{target_type === "comment" ? "댓글" : "소설"}</div>
        <div className="manage-total-num">총 {report.length}건</div>
        <Select
          value={order}
          options={sortOptions}
          style={{ width: 120 }}
          onChange={(value) => setOrder(value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={report}
        rowSelection={rowSelection}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleDetailClick(record.id),
          style: { cursor: "pointer" },
        })}
      />
    </ReportManageStyled>
  );
};

export default ReportManagement;
