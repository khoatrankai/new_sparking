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
// import { IoAddOutline } from "react-icons/io5";
import { useForm } from "antd/es/form/Form";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useDispatch } from "react-redux";
import systemService from "@/services/systemService";
import { Budget } from "@/models/systemInterface";
import { fetchBudget } from "@/redux/store/slices/systemSlices/get_budget.slice";

type Props = {
  id?:string
  refBtn?:Ref<HTMLButtonElement>
};

export default function ModalUpdateBudget({ id,refBtn }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const { postdata } = usePostData();

  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
    fetchData()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchData = async()=>{
    
    const resContract = await systemService.getBudget(id as string)
   
    if(resContract.statusCode === 200){
      form.setFieldsValue(resContract.data);
    }
  }


  const handleSubmit = async (values: Budget) => {
   
    const res = await postdata(() =>
      systemService.updateBudget(id as string,values)
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
              hidden={refBtn ? true : false}
              className="  text-xs text-yellow-500 font-semibold"
              type="text"
              ref={refBtn}
              onClick={showModal}
            >
              Chỉnh sửa
            </Button>
      <Modal
        title="Cập nhật ngân sách"
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
          <div className="flex flex-wrap gap-2 h-fit w-fit rounded-lg p-1">
                     
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
                                        className="!m-0 flex"
                                        label="Phân bổ"
                                        rules={[{ required: true, message: "Vui lòng nhập phân bổ!" }]}
                                        style={{ flex: "1 1 0%" }}
                                      >
                                        <InputNumber defaultValue={0} className="w-full" />
                                      </Form.Item>
                       <Form.Item
                                      name="spent"
                                      className="!m-0 flex"
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
