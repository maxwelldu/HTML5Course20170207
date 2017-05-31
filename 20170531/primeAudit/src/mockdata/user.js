import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '李某某'
  }
];

const Users = [];

for (let i = 0; i < 6; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

//设备模型
const Equips = [];
for(let i=0;i<8;i++){
	Equips.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.mock('@ctitle(3, 5)'),
	timestamp: Mock.mock('@datetime'),
	equipName: Mock.mock('@ctitle(3, 5)'),
    type: 1,
    model: '大',
	size: "big",
	"amount|1-100": 1,
    "sysNo|1-100": 1,
	addDate: Mock.Random.date()
  }));
	
}

export { LoginUsers, Users ,Equips};
