<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="24"
                            class="dashdiv">
                        <el-col :span="12">
                            <UserAvatar></UserAvatar>
                        </el-col>
                        <el-col :span="12">
                            <div class="textdiv">
                                <span>{{ this.name }}</span>
                                <span>{{ this.domainName }}</span>
                            </div>
                        </el-col>

                        <el-col :span="24">
                            <div class="spanblock padding20">
                                <span>上次登录时间:</span>
                                <span>上次登录地点:</span>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <div class="dashdiv">
                            <div class="title">
                                <span>预警</span>
                            </div>
                            <div class="dash_ul">
                                <ul>
                                    <li :key="item.id"
                                        v-for="item in warningData">
                                        <a href="#">{{ item.value }}</a><a :class="item.color"
                                           class="time"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="18">
                <el-row>
                    <el-col :span="24"
                            class="dashdiv">
                        <el-col :span="8">
                            <el-col :span="12">
                                <div class="infopic">
                                    <div class="textdiv iconstyle">
                                        <span><i class="el-icon-share"></i></span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="textdiv">
                                    <span class="info_title">预警</span>
                                    <span class="info_num">555</span>
                                </div>
                            </el-col>
                        </el-col>

                        <el-col :span="8">
                            <el-col :span="12">
                                <div class="infopic">
                                    <div class="textdiv iconstyle">
                                        <span><i class="el-icon-share"></i></span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="textdiv">
                                    <span class="info_title">待办事项</span>
                                    <span class="info_num">5555</span>
                                </div>
                            </el-col>
                        </el-col>

                        <el-col :span="8">
                            <el-col :span="12">
                                <div class="infopic">
                                    <div class="textdiv iconstyle">
                                        <span><i class="el-icon-share"></i></span>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="textdiv">
                                    <span class="info_title">通知公告</span>
                                    <span class="info_num">55555</span>
                                </div>
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24"
                            class="dashdiv">
                        <div class="title">
                            <span>待办事项</span>
                        </div>
                        <ul>
                            <li :key="item.id"
                                v-for="item in todoList">
                                <a href="#">{{ item.value }}</a><a class="time">{{ item.time }}</a>
                            </li>
                        </ul>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24"
                            class="dashdiv">
                        <div class="title">
                            <span>通知公告</span>
                        </div>
                        <ul>
                            <li :key="item.id"
                                v-for="item in infoList">
                                <a href="#">{{ item.value }}</a><a class="time">{{ item.time }}</a>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "@/components/UserAvatar";

export default {
    name: "home",
    components: {
        UserAvatar
    },
    computed: {
        ...mapGetters(["name", "domainName", "token", "addRouters", "passWord"])
    },
    data () {
        return {
            warningData: [
                { id: 1, value: "安全库存预警", color: "red" },
                { id: 2, value: "延迟交货预警", color: "yellow" },
                { id: 3, value: "三日不足件预警", color: "red" },
                { id: 4, value: "订单延迟应答预警", color: "orange" }
            ],
            todoList: [
                { id: 1, value: "入库质检-PZ190503001", time: "20190101" },
                { id: 2, value: "入库质检-PZ190503002", time: "20190102" },
                { id: 3, value: "入库质检-PZ190503003", time: "20190103" },
                { id: 4, value: "质检判定-PD190503001", time: "20190104" },
                { id: 5, value: "质检判定-PD190503002", time: "20190105" },
                { id: 6, value: "质检判定-PD190503003", time: "20190106" }
            ],
            infoList: [
                { id: 1, value: "订单反馈通知", time: "20190101" },
                { id: 2, value: "质检驳回通知", time: "20190102" },
                { id: 3, value: "公告信息", time: "20190103" }
            ]
        };
    },
    created () { },
    methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//首页样式
.dashboard-container {
    margin: 15px !important;
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
        padding-left: 10px;
        font-size: 12px;
    }

    li {
        height: 30px;
    }

    .time {
        position: absolute;
        right: 20px;
    }

    .head-portrait {
        border: solid 1px #d5d8da;
        border-top: solid 6px #d5d8da;
        background-color: white;
        height: 200px;
    }

    .title {
        border-bottom: solid 1px #d5d8da;
        padding-left: 20px;
        line-height: 36px;
        font-size: 14px;
    }

    li a {
        max-width: 245px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        height: 30px;
        line-height: 30px;
    }
}

.dashboard-container .el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.infopic {
    height: 100px;
    background-color: #aabbcc;
}

.dashdiv {
    background-color: #fff;
    border-top: solid 6px #d5d8da;
}

.spanblock {
    border-top: 1px solid #aabbcc;
    line-height: 25px;
    margin-top: 5px;
}

.spanblock span {
    display: block;
}

.textdiv {
    width: 100%;
    height: 100px;
}

.textdiv span {
    display: block;
    text-align: center;
    position: relative;
    top: 35%;
}

.iconstyle {
    color: brown;
    font-size: 30px;
}

.info_title {
    font-size: 15px !important;
}

.info_num {
    font-size: 28px !important;
    color: #7ecef4 !important;
}

.padding20 {
    padding: 20px;
}

.dash_ul {
    li span {
        display: inline-block;
    }

    .left {
        float: left;
    }
    .right {
        float: right;
    }

    .red {
        background-color: red;
        width: 20px;
        height: 10px;
        margin-top: 8px;
    }
    .yellow {
        background-color: yellow;
        width: 20px;
        height: 10px;
        margin-top: 8px;
    }
    .orange {
        background-color: orange;
        width: 20px;
        height: 10px;
        margin-top: 8px;
    }
}
</style>