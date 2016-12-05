// 按 component 名归类
let cn = {
  WaiterHeader: {
    title: '服务系统'
  },
  Login: {
    title: '登录您的账户',
    user_name: '用户名',
    password: '密码',
    login: '登录',
    error_info: '您的输入有误，请检验并重新输入。'
  },
  infoBar: {
    liushui: '交易流水的时间段',
    reload: '刷新'
  },
  Payltem: {
    numb: '订单号',
    amount: '订单金额'
  },
  PaySum: {
    amount: '实时交易笔数',
    money: '实时交易总金额',
    true_amount: '实际交易金额'
  },
  PayDetail: {
    detail: '交易细节',
    time: '交易时间',
    numb: '交易单号',
    type: '活动种类',
    rule: '优惠规则',
    ori: '原价',
    unpar: '不参与优惠的金额',
    payfor: '实际交易的金额',
    weixin: '微信交易单号'
  },
  SearchPH: {
    numb: '请输入交易单号',
    his: '搜索历史'
  },
  SearchP: {
    del: '删除搜索历史'
  },
  SearchPN: {
    nan: '暂无搜索历史'
  },
  SearchRH: {
    numb: '请输入交易单号'
  },
  SearchEm: {
    nan: '没有找到该笔交易'
  },
  PayNC: {
    nan: '没有订单记录'
  },
  RightBar: {
    out: '退出登录',
    name: '商户名称',
    numb: '商户号'
  }
}

let th = {
  WaiterHeader: {
    title: 'ระบบสาํหรับพนักงาน'
  },
  // Login: {
  //   title: 'ระบบสาํหรับพนักงาน',
  //   user_name: 'ชื่อผู้ใช้งาน',
  //   password: 'รหัสผ่าน',
  //   login: 'เข้าสู่ระบบ',
  //   error_info: 'ชือ่ผูใ้ช้หรอืรหสัผ่านไม่ถกูต้องกรุณาตรวจสอบและลองอกีครั้ง'
  // },
  Login: cn.Login,
  infoBar: {
    liushui: 'ชว่งเวลาการไหลของการทาํธุรกรรม',
    reload: 'รีเฟรช'
  },
  Payltem: {
    numb: 'หมายเลขการสั่งซื้อ',
    amount: 'จำนวนเงินของการสั่งซื้อ'
  },
  PaySum: {
    amount: 'จํานวนการทําธรุกรรมทั้งหมด',
    money: 'ยอดจํานวนเงินการทําธรุกรรมณขนาดนน้ั',
    true_amount: 'การทําธรุกรรมจาํนวนเงินทีต่อ้งจา่ยจริง'
  },
  PayDetail: {
    detail: 'รายละเอียดการทําธุรกรรม',
    time: 'เวลาการทําธุรกรรม',
    numb: 'หมายเลขอ้างอิงการทําธุรกรรม',
    type: 'ประเภทกิจกรรม&โปรโมชั่น',
    rule: 'กติกาการใช้สทิธิ์ส่วนลด',
    ori: 'ราคาเดิม',
    unpar: 'จํานวนเงินไม่ร่วมรายการส่วนลด',
    payfor: 'จํานวนเงินทตี่้องจ่ายจริงในการทําธุรกรรม',
    weixin: 'หมายเลขอ้างอิงการทําธุรกรรมของ'
  },
  SearchPH: {
    numb: 'กรุณาใสห่มายเลขอ้างอิงการทําธุรกรรม',
    his: 'ประวัติการค้นหา'
  },
  SearchP: {
    del: 'ลบประวัติการค้นหา'
  },
  SearchPN: {
    nan: 'ยังไม่มีประวัติการค้าหาในขณะนี้'
  },
  SearchRH: {
    numb: 'กรุณาใสห่มายเลขอ้างอิงการทําธุรกรรม'
  },
  SearchEm: {
    nan: 'ต้องขอโทษด้วยที่ไม่ได้ในการค้นหาเนื้อหาที่เกี่ยวข้อง '
  },
  PayNC: {
    nan: 'ยังไม่มีการบันทึกคําสั่งซื้อ'
  },
  RightBar: {
    out: 'ออกจากระบบ',
    name: 'ชื่อร้านค้า',
    numb: 'รหัสร้านค้า'
  }
}

module.exports = {
  cn: cn,
  th: th
}
