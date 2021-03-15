import { message, Typography, Button } from "antd";
import { SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { createOrUpdateSetting, getSetting } from '../../utils/api-services/setting-service'

export default function SettingPage() {
  const [percent, setPercent] = useState(0)

  useEffect(async () => {
    try {
      const response = await getSetting();
      setPercent(response.data.percent);
    } catch (error) {
      throw error;
    }
  }, [])

  const changeSetting = async (str) => {
    if (!str || isNaN(str)) {
      message.error("Invalid number!");
      return;
    }
    try {
      const response = await createOrUpdateSetting(str * 1);
      if (str * 1 > 100 || str * 1 < 0) {
        message.error("Number must >= 0 and =< 100");
        return;
      }
      if (response.success) {
        message.success("Successfully")
        setPercent(str * 1);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.toString());
    }
  }

  return <>
    <h2 style={{ textAlign: "center", margin: "8px 0px" }}>Setting</h2>
    <h3 style={{ display: "inline", margin: 12 }}>Percent: </h3>
    <Typography.Paragraph editable={{
      icon: <SettingOutlined />,
      tooltip: 'Click to edit',
      onChange: changeSetting,
    }} style={{ display: "inline", fontSize: 18 }}>
      {percent}%
      </Typography.Paragraph>
  </>
}