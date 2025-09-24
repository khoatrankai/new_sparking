import usePostData from "@/hooks/usePostData";
import { CreateUser, IGetGroupUser } from "@/models/userInterface";
import { fetchGroupUser } from "@/redux/store/slices/userSlices/get_all_group.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import userService from "@/services/userService";
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

export default function ModalAddGroup({refBtnAdd}:Props) {
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


  const handleSubmit = async (values: IGetGroupUser) => {
    const res = await postdata(() => userService.createGroupUser(values));
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
      dispatch(fetchGroupUser());
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
        Thêm nhóm
      </Button>
      <Modal
        title="Tạo nhóm"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
        
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin nhóm" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="name_group"
                label="Tên nhóm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhóm!",
                  },
                  {
                    min: 1,
                    max: 50,
                    message: "Họ phải từ 1 đến 50 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập tên nhóm" />
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
