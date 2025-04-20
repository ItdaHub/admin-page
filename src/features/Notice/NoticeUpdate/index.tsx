import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input, Button, Form, message } from "antd";
import api from "@/utill/api";

interface Notice {
  id: number;
  title: string;
  content: string;
}

const NoticeUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm<Notice>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get<Notice>(`/announcement/${id}`);
        setTimeout(() => {
          form.setFieldsValue(res.data);
        }, 0);
      } catch (error: any) {
        console.error("공지사항 불러오기 실패:", error);
        message.error("공지사항 정보를 불러오는 데 실패했습니다.");
        router.push("/notice");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const onFinish = async (values: Notice) => {
    try {
      const response = await api.put(`/announcement/${id}`, {
        title: values.title,
        content: values.content,
      });
      if (response.status === 200) {
        message.success("공지사항이 성공적으로 수정되었습니다.");
        router.push(`/noticedetail/${id}`);
      } else {
        message.error("공지사항 수정에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("공지사항 수정 실패:", error);
      message.error("공지사항 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>공지사항 정보를 불러오는 중...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>공지사항 수정</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: "제목을 입력해주세요!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="내용"
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            저장
          </Button>
          <Button
            onClick={() => router.push("/notice")}
            style={{ marginLeft: 8 }}
          >
            취소
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeUpdatePage;
