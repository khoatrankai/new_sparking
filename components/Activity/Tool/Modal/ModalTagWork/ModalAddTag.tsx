import usePostData from "@/hooks/usePostData";
import { Tags } from "@/models/activityInterface";
import { fetchTagWork } from "@/redux/store/slices/activitySlices/get_all_tag.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import activityService from "@/services/activityService";
import CustomFormData from "@/utils/CustomFormData";
import {
  Button,
  Form,
  Input,
  Modal,
  Tabs,
  UploadFile,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TabPane from "antd/es/tabs/TabPane";
import React, { Ref, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
type Props = {
  refBtnAdd?:Ref<HTMLButtonElement>
}

export default function ModalAddTag({refBtnAdd}:Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm();

  const { postdata } = usePostData();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleSubmit = async (values: Tags) => {
    const res = await postdata(() => activityService.createTag(values));
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
      dispatch(fetchTagWork());
      form.resetFields();
    }
  };

  const btnSubmit = async () => {
    form.submit();
  };

  return (
    <>
      <Button
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
        ref={refBtnAdd}
        hidden={refBtnAdd?true:false}
      >
        Thêm tag
      </Button>
      <Modal
        title="Tạo tag"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
        
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin tag" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="name"
                label="Tên tag"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tag!",
                  },
                  {
                    min: 1,
                    max: 255,
                    message: "Họ phải từ 1 đến 50 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập tên tag" />
              </Form.Item>
               <Form.Item
                name="name_tag"
                label="Tên name_tag"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên name_tag!",
                  },
                  {
                    min: 1,
                    max: 255,
                    message: "Họ phải từ 1 đến 50 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập tên name_tag" />
              </Form.Item>

            </Form>
          </TabPane>
        </Tabs>
        <div className="flex justify-end w-full mt-4">
          <Button type="primary" onClick={btnSubmit}>
            Tạo
          </Button>
        </div>
      </Modal>
    </>
  );
}
