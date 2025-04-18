import { Button, Input, message, Select } from "antd";
import router from "next/router";
import { NewNoticeStyled } from "./styled";
import clsx from "clsx";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import api from "@/utill/api";

const { TextArea } = Input;
const { Option } = Select;

enum Priority {
  URGENT = "긴급",
  IMPORTANT = "중요",
  NORMAL = "기본",
}

interface NoticeForm {
  title: string;
  content: string;
  priorityLabel: Priority;
}

const validate = (values: any) => {
  const errors: any = {};

  if (!values.title) {
    errors.title = "제목을 입력하세요";
  }

  if (!values.content) {
    errors.content = "내용을 입력하세요";
  }
  return errors;
};

const NewNoticeManage = () => {
  const formik = useFormik<NoticeForm>({
    initialValues: {
      title: "",
      content: "",
      priorityLabel: Priority.NORMAL,
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("제출됨:", values);
      try {
        if (!values.title || !values.content) {
          setSubmitting(false);
          return;
        }
        // 공지사항 새 글 등록 axios 요청
        const res = await api.post("/adminnotification/register", {
          title: values.title,
          content: values.content,
          priorityLabel: values.priorityLabel,
        });
        console.log(res, "왔니?");
        message.success("공지사항이 등록되었습니다.");
        router.push("/notice");
      } catch (error) {
        console.error("공지 등록 실패:", error);
        message.error("공지사항 등록에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <NewNoticeStyled className={clsx("newNotice-wrap")}>
      <div className="newNotice-box">
        <h2 className="newNotice-title">새 공지사항</h2>
        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          onClick={() => {
            router.push("/notice");
          }}
        >
          목록
        </Button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-item">
          <label className="form-label">우선순위</label>
          <Select
            value={formik.values.priorityLabel}
            onChange={(value) => formik.setFieldValue("priorityLabel", value)}
          >
            <Option value={Priority.NORMAL}>{Priority.NORMAL}</Option>
            <Option value={Priority.IMPORTANT}>{Priority.IMPORTANT}</Option>
            <Option value={Priority.URGENT}>{Priority.URGENT}</Option>
          </Select>
        </div>

        <div className="form-item">
          <label className="form-label">제목</label>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="제목을 입력하세요."
          />
          {/* 조건부 렌더링으로 에러 출력 */}
          {formik.touched.title && formik.errors.title && (
            <div className="form-error">{formik.errors.title}</div>
          )}
        </div>

        <div className="form-item">
          <label className="form-label">내용</label>
          <TextArea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            maxLength={1000}
            rows={10}
            placeholder="내용을 입력하세요."
          />
          {/* 조건부 렌더링으로 에러 출력 */}
          {formik.touched.content && formik.errors.content && (
            <div className="form-error">{formik.errors.content}</div>
          )}
        </div>

        <Button type="primary" htmlType="submit" disabled={formik.isSubmitting}>
          등록하기
        </Button>
      </form>
    </NewNoticeStyled>
  );
};

export default NewNoticeManage;
