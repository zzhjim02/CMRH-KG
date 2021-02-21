import React,{ PureComponent } from 'react';
import { Select,Input,Col,Row,Button } from 'antd';
import styles from '../index.less';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Information from './Information'

@connect(({ timeSpaces,loading }) => ({
  timeSpaces,
  submitting: loading.effects['timeSpaces/timespaces'],
}))
class search extends PureComponent {
  state = {
    val: false,
    value1: '',
    mode: 'time',
    information: []
  }
  handleModeChange = (value) => {
    this.setState({ mode: value });
  }
  handleChange1 = e => {
    this.setState({
      value1: e.target.value
    })
  }

  fetchData1 = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'timeSpaces/getTimeRecallDetail',
      payload: this.state.value1,
      callback: (response) => {
        if(response !== null)
          this.setState({
            information:response
          })
      }
    })
  }

  render(){
    const { mode } = this.state
    return (
      <div className={styles.outside}>
        <div className={styles.search}>
          <div className={styles.content}>
            <Select size={'large'} value={mode} onChange={this.handleModeChange}>
              <Select.Option value="time">时间点</Select.Option>
              <Select.Option value="times">时间段</Select.Option>
              <Select.Option value="space">地点</Select.Option>
              <Select.Option value="timespace">时空</Select.Option>
            </Select>
            {mode === "time" ?
              <div>
                <Input onChange={this.handleChange1}
                       size={"large"}
                       style={{ width: 400 }}
                       placeholder="请检索需要查询的时空实体,例如：1911年4月" />
                <Button type="primary"
                        icon={<SearchOutlined />}
                        size={"large"}
                        onClick={this.fetchData1}>
                  时空检索
                </Button>
              </div> : mode === "times" ? <div>
                <Input onChange={this.valueChange3} size={"large"} style={{ width: 150 }} placeholder="例如：1940年" />
                &nbsp;&nbsp;~&nbsp;&nbsp;
                <Input onChange={this.valueChange4} size={"large"} style={{ width: 150 }} placeholder="例如：1941年" />
                <Button type="primary"
                        icon={<SearchOutlined />}
                        size={"large"}
                        onClick={() => this.fetchData4(this.state.value1,this.state.value2)}>
                  时空检索
                </Button>
              </div> : mode === "space" ?
                <div>
                  <Input onChange={this.valueChange2}
                         size={"large"}
                         style={{ width: 400 }}
                         placeholder="请检索需要查询的时空实体,例如：广州" />
                  <Button type="primary"
                          icon={<SearchOutlined />}
                          size={"large"}
                          onClick={() => this.fetchData2(this.state.value2)}>
                    时空检索
                  </Button>
                </div> : <div>
                  <Input onChange={this.valueChange1}
                         size={"large"}
                         style={{ width: 220,marginRight: '5px' }}
                         placeholder="时间点：(例如：1911年4月)" />
                  <Input onChange={this.valueChange2} size={"large"} style={{ width: 220 }} placeholder="地点：(例如：广州)" />
                  <Button type="primary"
                          size={"large"}
                          icon={<SearchOutlined />}
                          onClick={() => this.fetchData3(this.state.value1,this.state.value2)}>
                    时空检索
                  </Button>
                </div>}
          </div>
        </div>
        <Information detail={this.state.information} />
      </div>
    );
  }
}

export default search;