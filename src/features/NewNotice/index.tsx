import { Button, Input } from "antd";
import router from "next/router";
import { NewNoticeStyled } from "./styled";
import clsx from "clsx";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextArea from "antd/es/input/TextArea";

interface NoticeForm {
  title: string;
  content: string;
  priorityLabel: string;
}

const NewNotice = () => {
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
      <Formik
        initialValues={{ title: "", content: "", priorityLabel: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("제출됨:", values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="form-item">
            <label className="form-label">제목</label>
            <Input name="title" placeholder="제목을 입력하세요." />
          </div>

          <div className="form-item">
            <label className="form-label">내용</label>
            <TextArea
              name="content"
              rows={6}
              maxLength={1000}
              placeholder="내용을 입력하세요."
            />
          </div>
          <Button type="primary">등록하기</Button>
        </Form>
      </Formik>
    </NewNoticeStyled>
  );
};

export default NewNotice;
