interface IUserDao {
    save(): void;
}

// 用户本体数据
class UserDao implements IUserDao {
    public save(): void {
        console.log('数据已经保存')
    }
}

class UserDaoProxy implements IUserDao {
    // 接受目标对象
    private target: IUserDao;
    constructor(target: IUserDao) {
        this.target = target;
    }
    public save(): void {
        console.log("开始业务");
        this.target.save();
        console.log("提交事务");
    }
}

const target: UserDao = new UserDao();
const proxy: UserDaoProxy = new UserDaoProxy(target);

// 代理层具体完成业务
proxy.save()
