import { Button, Form, message, Space, Tag, Upload } from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  CloudDownloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
function ProcessAndStatistic() {
  const [result, setResult] = useState();
  const [fileList, setFileList] = useState([]);
  const [downloadtedIndex, setDownloadtedIndex] = useState(-1);
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const formData = new FormData();
      formData.append("file", values.dragger[0]); // Extract the file from the array

      const response = await axios.post(
        "http://localhost:5050/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setResult(response.data.sheetData);
    } catch (error) {}
  };
  const onChange = (info) => {
    setResult();
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Access the response from the server
      const response = info.file.response;
      setResult(info.file.response.sheetData);
      // Handle the JSON response as needed
      console.log("Response:", response);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const download = async (value, sheetId, index) => {
    try {
      setDownloadtedIndex(index);
      const response = await axios.post(
        "http://localhost:5050/api/file/download",
        {
          vechai: value.Vachai,
          bazo: value.bazo,
          bot: value.bot,
          crom: value.crom,
          niken: value.niken,
          sheetId: sheetId,
        },
        {
          responseType: "blob", // Important for handling binary data
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloaded-file.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadtedIndex();
    } catch (error) {
      console.error("File download failed:", error);
    }
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",

        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Form name="validate_other" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            name="file"
            action={"http://localhost:5050/api/file/upload"}
            fileList={fileList}
            onChange={onChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
      {result && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "30vh",

            overflow: "auto",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          {result?.result
            ?.sort((a, b) => a.Result.Price - b.Result.Price)
            .map((item, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <h3>Option {index + 1}</h3>
                    <h4>Price: {item.Result.Price.toFixed(3)}</h4>
                    <h4>Status: {item.Result.OK}</h4>
                  </div>
                  <Space size={[0, 10]}>
                    <Tag color="volcano">Ve chai: {item.Vachai}</Tag>
                    <Tag color="gold">Bazo: {item.bazo}</Tag>
                    <Tag color="green">Bot: {item.bot}</Tag>
                    <Tag color="blue">Crom: {item.crom}</Tag>
                    <Tag color="purple">Niken: {item.niken}</Tag>
                  </Space>
                </div>
                <Button
                  onClick={
                    () => download(item, result.sheetId, index)
                    // console.log({ item: item, id: result.sheetId })
                  }
                >
                  {downloadtedIndex == index ? (
                    <LoadingOutlined />
                  ) : (
                    <CloudDownloadOutlined />
                  )}
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProcessAndStatistic;
