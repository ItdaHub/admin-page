// pages/noticeEdit/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";

interface Notice {
  id: string;
  number: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

const dummyData: Notice[] = [
  {
    id: "1",
    number: 1,
    title: "2024년도 출판 안내",
    author: "권예은",
    date: "2018.05.04 14:16",
    content: "2024년 출판 계획에 대한 안내입니다...",
  },
  {
    id: "2",
    number: 2,
    title: "4월 서비스점검 작업 안내",
    author: "박정은",
    date: "2018.04.20 15:31",
    content: "4월 중 서비스 점검이 예정되어 있습니다...",
  },
  {
    id: "3",
    number: 3,
    title: "웹메일 장애복구와 사과의 말씀",
    author: "손은비",
    date: "2018.05.04 14:40",
    content: "웹메일 장애에 대해 사과드리며 복구를 완료했습니다...",
  },
];

const NoticeUpdate = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (id) {
      const found = dummyData.find((item) => item.id === id);
      if (found) {
        setNotice(found);
        form.setFieldsValue(found);
      }
    }
  }, [id, form]);

  const onFinish = (values: any) => {
    console.log("수정된 값:", values);
    alert("수정이 완료되었습니다.");
    router.push(`/noticedetail/${id}`);
  };

  if (!notice) return <div>공지사항을 불러오는 중...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>공지사항 수정</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="제목" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="author" label="작성자" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="내용" rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => router.push(`/noticedetail/${id}`)}
            style={{ marginRight: 8 }}
          >
            저장
          </Button>
          <Button onClick={() => router.back()} style={{ marginLeft: 8 }}>
            취소
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeUpdate;
