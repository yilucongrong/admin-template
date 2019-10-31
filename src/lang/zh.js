export default {
    //路由模块
    route: {
        dashboard: '首页',
        // 系统管理模块
        sys: '系统管理',
        zzjg: '组织结构',
        yggl: '员工管理',
        yhgl: '用户管理',
        xtcd: '系统菜单',
        jsgl: '角色管理',
        sjzd: '数据字典',
        // 基础数据模块
        jcsj: '基础数据',
        relationorg: '往来单位',
        gyszsj: '供应商主数据',
        gw: '工位定义',
        WorkCenter: '工作中心',
        gzzxzsj: '工作中心主数据',
        Mat: '物料参数',
        materiel: '物料主数据',
        documentation: '文档',
        guide: '引导页',
        permission: '权限测试页',
        rolePermission: '角色权限',
        pagePermission: '页面权限',
        directivePermission: '指令权限',
        icons: '图标',
        components: '组件',
        tinymce: '富文本编辑器',
        markdown: 'Markdown',
        jsonEditor: 'JSON 编辑器',
        dndList: '列表拖拽',
        splitPane: 'Splitpane',
        avatarUpload: '头像上传',
        dropzone: 'Dropzone',
        sticky: 'Sticky',
        countTo: 'Count To',
        componentMixin: '小组件',
        backToTop: '返回顶部',
        dragDialog: '拖拽 Dialog',
        dragSelect: '拖拽 Select',
        dragKanban: '可拖拽看板',
        charts: '图表',
        keyboardChart: '键盘图表',
        lineChart: '折线图',
        mixChart: '混合图表',
        example: '综合实例',
        nested: '路由嵌套',
        menu1: '菜单1',
        'menu1-1': '菜单 1-1',
        'menu1-2': '菜单 1-2',
        'menu1-2-1': '菜单 1-2-1',
        'menu1-2-2': '菜单 1-2-2',
        'menu1-3': '菜单 1-3',
        menu2: '菜单 2',
        Table: 'Table',
        dynamicTable: '动态 Table',
        dragTable: '拖拽 Table',
        inlineEditTable: 'Table 内编辑',
        complexTable: '综合 Table',
        tab: 'Tab',
        form: '表单',
        createArticle: '创建文章',
        editArticle: '编辑文章',
        articleList: '文章列表',
        errorPages: '错误页面',
        page401: '401',
        page404: '404',
        errorLog: '错误日志',
        excel: 'Excel',
        exportExcel: '导出 Excel',
        selectExcel: '导出 已选择项',
        mergeHeader: '导出 多级表头',
        uploadExcel: '上传 Excel',
        zip: 'Zip',
        pdf: 'PDF',
        exportZip: 'Export Zip',
        theme: '换肤',
        clipboardDemo: 'Clipboard',
        i18n: '国际化',
        externalLink: '外链',
        donate: '打赏',
        profile: '个人中心'
    },
    //个人信息模块
    navbar: {
        dashboard: '首页',
        github: '项目地址',
        logOut: '退出登录',
        profile: '个人中心',
        theme: '换肤',
        size: '布局大小',
        settings: '设置'
    },
    //登录模块
    login: {
        title: '系统登录',
        logIn: '登录',
        username: '账号',
        password: '密码',
        any: '随便填',
        thirdparty: '第三方登录',
        thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
    },
    documentation: {
        documentation: '文档',
        github: 'Github 地址'
    },
    permission: {
        addRole: '新增角色',
        editPermission: '编辑权限',
        roles: '你的权限',
        switchRoles: '切换权限',
        tips:
            '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
        delete: '删除',
        confirm: '确定',
        cancel: '取消'
    },
    guide: {
        description:
            '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
        button: '打开引导'
    },
    components: {
        documentation: '文档',
        tinymceTips:
            '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
        dropzoneTips:
            '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
        stickyTips: '当页面滚动到预设的位置会吸附在顶部',
        backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
        backToTopTips2:
            '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
        imageUploadTips:
            '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
    },
    // 按钮
    btn: {
        empower: '授权',
        unauthority: '取消授权',
        copyonly: '复制',
        createTime: '创建时间',
        generate: '生成',
        import: '导入',
        search: '搜索',
        add: '添加',
        export: '导出',
        actions: '操作',
        edit: '编辑',
        publish: '发布',
        draft: '草稿',
        delete: '删除',
        cancel: '取 消',
        confirm: '确 定'
    },
    //表格模块
    table: {
        remark: '点评',
        // 以下中英文按钮功能移至btn
        // search: '搜索',
        // add: '添加',
        // export: '导出',
        // edit: '编辑',
        // confirm: '确 定',
        // delete: '删除',
        //cancel: '取 消',
        // publish: '发布',
        // 系统管理
        organizationNum: '组织编码',
        organizationName: '组织名称',
        organizationType: '组织类型',
        superiorType: '上级组织',
        parentId: '上级组织',
        address: '地址',
        email: '邮箱',
        contacts: '联系人',
        phone: '电话',
        mobile: '电话',
        postalCode: '邮政编码',
        businessFunction: '业务职能',
        state: '状态',
        remarks: '备注',
        enable: '启用',
        stop: '停用'
    },
    //表单模块
    form: {
        close: '关闭',
        stop: '停用',
        open: '开启'
    },
    //tabs页
    tabs: {
        selected: '已选项',
        tbSelected: '备选项'
    },
    //员工管理
    employeesManagement: {
        employeeCode: '员工编码',
        employeeName: '员工名称',
        organizationId: '所属组织',
        sex: '性别',
        mobile: '联系电话',
        officePhone: '办公电话',
        email: '邮箱地址',
        state: '员工状态',
        birthday: '生日',
        hireDate: '入职时间',
        idNumber: '身份证号',
        address: '居住地址',
        remark: '备注',
        materielName: '物料名称',
        userName: '用户账号',
        realName: '用户名称',
        password: '用户密码',
        isLog: '日志状态',
        userMaintain: '用户维护'
    },
    //用户管理
    userManagement: {
        userName: '用户名称',
        realName: '真实姓名',
        lastIp: '上一次登陆IP',
        state: '用户状态',
        isLog: '用户日志',
        roleAuthorization: '角色授权',
        roleName: '角色名称',
        roleCode: '角色编码',
        roleType: '角色类型',
        functionAuthorization: '功能授权',
        userAuthorization: '用户授权',
        unrelatedRoles: '未关联角色',
        associatedRoles: '已关联角色',
        domainScope: '所属域'
    },
    //系统菜单
    systemMenu: {
        catalogCode: '资源编码',
        catalogName: '资源名称',
        catalogEngName: '资源英文名',
        catalogOrder: '序号',
        nodeType: '节点类型',
        parentId: '父目录',
        url: '路径',
        remark: '备注',
        resourceAssociation: '资源关联',
        buttonOprate: '按钮操作'
    },
    //系统资源
    systemResource: {
        endpointCode: '资源号',
        endpointName: '资源名称',
        url: '资源路径',
        method: '状态',
        remark: '备注',
        parentId: '父目录',
        resourceAssociation: '资源关联'
    },
    //数据字典
    dict: {
        dictCode: '分类编码',
        dictName: '分类名称',
        dictType: '类型',
        dictItemDTOs: '字典类型',
        dictItemKey: '字典编码',
        dictItemValue: '字典名称'
    },
    //角色关联
    roleManagement: {
        roleCode: '角色编码',
        roleName: '角色名称',
        roletype: '角色类型',
        userName: '用户编码',
        remark: '角色描述',
        employeeId: '用户编码',
        realName: '用户名称',
        roleType: '角色类型',
        resourceAssociation: '资源关联'
    },

    //供应商主数据
    supplier: {
        supplierCode: '供应商编码',
        supplierName: '供应商名称',
        supplierType: '供应商类型',
        supplierTypeName: '供应商分类',
        supplyClassifyName: '供货分类',
        supplierGradeName: '供应商等级',
        contact: '联系人',
        contactNumber: '联系电话',
        email: '电子邮箱',
        address: '通讯地址',
        remark: '描述'
    },
    //工位
    workstation: {
        stationCode: '工位',
        stationName: '工位名称',
        lineCode: '生产线',
        stationNo: '工位序号',
        stationType: '工位类型',
        feedArea: '投控区域',
        locationCode: '储位编码',
        locationName: '储位名称',
        warehouseCode: '仓库编码',
        warehouseName: '仓库名称',
        areaCode: '区位编码',
        stationTypeName: '工位类型名称',
        lineName: '生产线名称'
    },
    //工作中心主数据
    workCenter: {
        workCenterCode: '工作中心编码',
        workCenterName: '工作中心名称',
        workCenterTypeName: '类型',
        workCenterClassName: '类别',
        workCenterGroupName: '工作中心组',
        workCenterModelName: '作业模式',
        productBeat: '生产节拍',
        beatTimeunitName: '生产节拍单位',
        productNum: '作业位数',
        feedAreaName: '投控区域',
        orgCode: '组织编码',
        parentCode: '上级工作中心',
        workCenterType: '工作中心类型',
        workCenterClass: '工作中心类别',
        bufferArea: '缓冲区域'
    },
    //物料主数据
    materiel: {
        materielType: '物料类型',
        materielClassify: '物料分类',
        materielGroup: '物料组',
        specification: '规格',
        materielCode: '物料编码',
        materielName: '物料名称',
        materialQuality: '材质',
        productionState: '状态',
        materielEngName: '物料名称(英文)',
        materielTypeName: '物料类型',
        materielClassifyName: '物料分类',
        materielGroupName: '物料组',
        measuringUnitName: '计量单位',
        externalMaterielCode: '外部物料编码',
        weight: '重量(KG）',
        volume: '体积(CM³)',
        length: '长(CM)',
        width: '宽(CM)',
        height: '高(CM)',
        shelfLife: '保质期(天)',
        classStandard: '产品等级',
        productStandard: '产品标准',
        productionStateName: '生产状态',
        importantMaterielMark: '重保标记',
        remark: '备注',
        measureCode: '计量编码',
        measureName: '计量名称',
        dimension: '所属量纲',
        dimensionName: '所属量纲',
        isBase: '是否基本计量',
        transferRate: '装换率'
    },
    example: {
        warning:
            '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
    },
    errorLog: {
        tips: '请点击右上角bug小图标',
        description:
            '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
        documentation: '文档介绍'
    },
    excel: {
        export: '导出',
        selectedExport: '导出已选择项',
        placeholder: '请输入文件名(默认excel-list)'
    },
    zip: {
        export: '导出',
        placeholder: '请输入文件名(默认file)'
    },
    pdf: {
        tips: '这里使用   window.print() 来实现下载pdf的功能'
    },
    //主题模块
    theme: {
        change: '换肤',
        documentation: '换肤文档',
        tips:
            'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
    },
    //tagsview模块
    tagsView: {
        refresh: '刷新',
        close: '关闭',
        closeOthers: '关闭其它',
        closeAll: '关闭所有'
    },
    //设置模块
    settings: {
        title: '系统布局配置',
        theme: '主题色',
        tagsView: '开启 Tags-View',
        fixedHeader: '固定 Header',
        sidebarLogo: '侧边栏 Logo'
    },
    //其它模板用 可删
    //交货单发布
    deliveryPublish: {
        deliverNo: '交货单号',
        arrivalCompany: '到货单位',
        arrivalRepository: '到货仓库',
        supplier: '供应商',
        supplierCode: '供应商编码',
        supplierName: '供应商名称',
        publishTime: '发布日期',
        state: '状态',
        contact: '联系人',
        mobile: '电话',
        plateNumber: '车牌号',
        rowNo: '行号',
        materielCode: '物料编码',
        materielName: '物料名称',
        orderQuantity: '订单数量',
        deliveredQuantity: '已发货数量',
        deliverableQuantity: '可发货量',
        deliverQuantity: '本次发货数量',
        arrivalDate: '计划到货日期',
        remark: '备注',
        snp: 'SNP',
        receiveCompany: '收货单位',
        receiveWareHouse: '收货仓库',
        measuringUnit: '计量单位',
        createTime: '创建日期'
    }
}
