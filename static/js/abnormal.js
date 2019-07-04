var yicSearch = [
	{
		'type':'业务状态异常',
		'rease':['用户已停机','用户未签约4G GPRS','CMNET，CMWAP APN未签约','用户（具体的套餐限速）','用户处于弱覆盖区','用户终端问题']
	},
	{
		'type':'信令指标异常',
		'rease':['TCP1/2步握手成功率低','TCP1/2步握手时延长','HTTP响应成功率低','HTTP响应时延长','乒乓切换','乒乓TAU','控制面附着成功率低','控制面TAU成功率低','控制面X2切换成功率低','控制面Service Request业务请求成功率低','频繁TAU','频繁切换（X2、S1）','频繁附着Attach','TCP2/3步握手成功率低','TCP2/3步握手时延长','TCP重传率高','HTTP下行速率低']
	},
	{
		'type':'网优异常',
		'rease':['高负荷','高干扰','E-RAB建立成功率低','RRC连接建立成功率低','无线掉线率高','RRC连接最大数高','寻呼拥塞率高']
	},
	{
		'type':'MR异常',
		'rease':['弱覆盖','重叠覆盖','邻区过覆盖']
	},
	{
		'type':'发生告警',
		'rease':['星卡天线故障告警','星卡锁星不足告警','星卡时钟输出异常告警','时钟参考源异常告警','系统时钟不可用告警','系统时钟失锁告警','Loss of Tracking','Network Synch Time from GPS Missing','Clock Calibration Expiry Soon','TimingSyncFault','Slave TU Out of Synchronization','CB GPS LOCK FAILURE','CB GPS ANT','CB FLYWHEEL CRITICAL','CB GPS LOCK FAILURE CRITICAL','CB GPS LOCK FAILURE MAJOR','CB FLYWHEEL START','CB GPS LOCK FAILURE','CB LOSS OF PRIMARY REFERENCE','CB FLYWHEEL MINOR','CB FLYWHEEL MAJOR','没有可用的空口时钟源','GNSS接收机搜星故障','GNSS天馈链路故障','基站同步异常','BASE STATION NOTIFICATION','BASE STATION NOTIFICATION','BASE STATION OPERATION DEGRADED','BASE STATION NOTIFICATION','BASE STATION OPERATION DEGRADED','BASE STATION NOTIFICATION','BASE STATION NOTIFICATION','BASE STATION OPERATION DEGRADED','BASE STATION NOTIFICATION,Difference between BTS master clock and reference frequency','BASE STATION NOTIFICATION,GPS receiver alarm: position questionable','BASE STATION OPERATION DEGRADED,BTS reference clock missing','BASE STATION NOTIFICATION,BTS time not corrected','BASE STATION OPERATION DEGRADED,BTS reference clock missing','BASE STATION NOTIFICATION,GPS receiver alarm: not tracking satellites','BASE STATION NOTIFICATION,GPS receiver alarm: survey in progress','BASE STATION OPERATION DEGRADED,PPS reference clock missing in startup','RX-TX [10] ANTENNA-VSWR-WARNING [11]','RX-TX [10] ANTENNA-VSWR-URGENT [12]','天馈驻波比异常','RADIO X-CEIVER ADMINISTRATION MANAGED OBJECT FAULT','射频单元驻波告警','射频单元驻波告警','ANTENNA_PORT TX VSWR THRESH1','ANTENNA_PORT TX VSWR THRESH2','CELL OPERATION DEGRADED,VSWR minor alarm','CELL OPERATION DEGRADED,VSWR major alarm','天馈驻波比异常','VSWR Over Threshold','RF Reflected Power High','基站退服告警','eNodeB基站退服','GSM小区退出服务告警','CELL [43] LOSS-OF-ALL-CHAN [3]','CELL LOGICAL CHANNEL AVAILABILITY SUPERVISION','小区中断告警','小区不可用告警','LTECellDown','Service Unavailable','LTE小区退出服务','CELL FAULTY,BTS config error (Not enough HW for LCR)','CELL FAULTY,Antenna line switched off','CELL FAULTY,Distributed site support not enabled','CELL FAULTY,Cell power failure','CELL FAULTY,Antenna Carrier configuration failure','射频单元维护链路异常告警','RFM COMM FAIL','COMM FAIL','HW Fault','Power Failure','Power Loss','RRU链路断','设备掉电','CELL FAULTY,Incoherency with RF Modules','CELL FAULTY,RF Module configuring failed','CELL FAULTY,RF Module critical file not found','CELL FAULTY,RF Module Filter input power missing','CELL FAULTY,RF Module out of order','CELL FAULTY,RF Module Power output faulty','CELL FAULTY,RF Module blocked','CELL FAULTY,RRU DPD self test failure','CELL FAULTY,RRU CPU and DSP link failure','CELL FAULTY,Mismatched RRU optical module optIf ID','CELL FAULTY,RRU AC power loss','CELL FAULTY,RF Module failure','CELL FAULTY,Failure in optical interface','CELL FAULTY,TX failure in MIMO','CELL FAULTY,VSWR major alarm','CELL FAULTY,VSWR minor alarm','CELL FAULTY,Low noise amplifier failure','CELL FAULTY,RRU AC power loss','单板闭塞告警','FRUAdminDown','RRU闭站告警','CELL FAULTY,Unit blocked']
	}
]