/* eslint-disable @typescript-eslint/no-explicit-any */
import usePostData from "@/hooks/usePostData";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
// import SubMenu from "antd/es/menu/SubMenu";
import React, { Ref, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { useForm } from "antd/es/form/Form";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Budget } from "@/models/systemInterface";
import systemService from "@/services/systemService";
import { fetchBudget } from "@/redux/store/slices/systemSlices/get_budget.slice";

type Props = {
  refBtnBudget?: Ref<HTMLButtonElement>;
};

export default function ModalAddBudget({ refBtnBudget }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const refBtn = useRef<HTMLButtonElement>(null)
  const { postdata } = usePostData();

  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 
  const handleSubmit = async (values: Budget) => {
   
    const res = await postdata(() =>
      systemService.createBudget(values)
    );
    if (res === 200 || res === 201) {
      form.resetFields();
      setIsModalVisible(false);
      dispatch(fetchBudget())
    }
  };


  return (
    <>
      <Button
        hidden={refBtnBudget ? true : false}
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
        ref={refBtnBudget}
      >
        Thêm ngân sách
      </Button>
      <Modal
        title="Tạo ngân sách"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          {/* <Menu
            mode="inline"
            style={{ width: "100%" }}
            defaultOpenKeys={["info"]}
          >
            <SubMenu title="Thông tin khách hàng" key="info"> */}
          <div className="flex flex-col gap-2 h-fit w-full rounded-lg p-1">
           
            <Form.Item
              name="name"
              className="!m-0"
              label="Tên gói ngân sách"
              rules={[
                { required: true, message: "Vui lòng nhập tên!" },
              ]}
              style={{flex: "1 1 0%" }}
            >
              <Input />
            </Form.Item>
               <Form.Item
                              name="allocation"
                              className="!m-0 w-full"
                              label="Phân bổ"
                              rules={[{ required: true, message: "Vui lòng nhập phân bổ!" }]}
                              style={{ flex: "1 1 0%" }}
                            >
                              <InputNumber defaultValue={0} className="w-full" />
                            </Form.Item>
             <Form.Item
                            name="spent"
                            className="!m-0 w-full"
                            label="Đã chi"
                            style={{ flex: "1 1 0%" }}
                          >
                            <InputNumber defaultValue={0} className="w-full" />
                          </Form.Item>
          </div>
         

          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
