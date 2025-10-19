import usePostData from "@/hooks/usePostData";
import { Tags } from "@/models/activityInterface";
import { fetchTagWork } from "@/redux/store/slices/activitySlices/get_all_tag.slice";
import { AppDispatch } from "@/redux/store/store";
import activityService from "@/services/activityService";
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
import React, { Ref, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
type Props = {
  refBtnUpdate?:Ref<HTMLButtonElement>
  name?:string
  name_tag?:string
  ID?:string
}

export default function ModalUpdateTag({refBtnUpdate,name,name_tag,ID}:Props) {
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
    const res = await postdata(() => activityService.updateTag(ID as string,values));
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
      dispatch(fetchTagWork());
      form.resetFields();
    }
  };

  useEffect(()=>{
    if(name && name_tag){
      form.setFieldValue('name',name)
      form.setFieldValue('name_tag',name_tag)
    }
  },[name,name_tag])

  const btnSubmit = async () => {
    form.submit();
  };

  return (
    <>
      <Button
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
        ref={refBtnUpdate}
        hidden={refBtnUpdate?true:false}
      >
        Cập nhật nhóm
      </Button>
      <Modal
        title="Cập nhật nhóm"
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
                    message: "Họ phải từ 1 đến 255 ký tự!",
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
                    message: "Họ phải từ 1 đến 255 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập tên tag" />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
        <div className="flex justify-end w-full mt-4">
          <Button type="primary" onClick={btnSubmit}>
            Cập nhật
          </Button>
        </div>
      </Modal>
    </>
  );
}
