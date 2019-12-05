<template>
    <el-row>
        <el-col :span="14">
            <div style="margin-left:5px">
                <el-table :data="tableData"
                          border
                          fit
                          style="width: 100%">
                    <el-table-column prop="Seconds"
                                     label="Seconds"
                                     width="110"></el-table-column>
                    <el-table-column prop="Minutes"
                                     label="Minutes"
                                     width="110"></el-table-column>
                    <el-table-column prop="Hours"
                                     label="Hours"
                                     width="110"></el-table-column>
                    <el-table-column prop="DayofMonth"
                                     label="DayofMonth"
                                     width="110"></el-table-column>
                    <el-table-column prop="Month"
                                     label="Month"
                                     width="110"></el-table-column>
                    <el-table-column prop="DayofWeek"
                                     label="DayofWeek"
                                     width="110"></el-table-column>
                    <el-table-column prop="Year"
                                     label="Year"
                                     width="120"></el-table-column>
                </el-table>
            </div>
            <div style="margin-top:10px;line-height:24px;margin-left:5px">
                <p>{{msg0}}</p>
                <p>{{msg1}}</p>
                <p>{{msg2}}</p>
                <p>{{msg3}}</p>
                <p>{{msg4}}</p>
                <p>{{msg5}}</p>
                <p>{{msg6}}</p>
                <p>{{msg7}}</p>
                <p>{{msg8}}</p>
            </div>
        </el-col>
        <el-col :span="10">
            <div style="margin-left:10px">
                <p>{{psg0}}</p>
                <p>{{psg1}}</p>
                <p>{{psg2}}</p>
                <p>{{psg3}}</p>
                <p>{{psg4}}</p>
                <p>{{psg5}}</p>
                <p>{{psg6}}</p>
                <p>{{psg7}}</p>
                <p>{{psg8}}</p>
                <p>{{psg9}}</p>
                <p>{{psg10}}</p>
                <p>{{psg11}}</p>
                <p>{{psg12}}</p>
                <p>{{psg13}}</p>
                <p>{{psg14}}</p>
                <p>{{psg15}}</p>
                <p>{{psg16}}</p>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data () {

        return {
            tableData: [{
                Seconds: '秒',
                Minutes: '分',
                Hours: '时',
                DayofMonth: '天',
                Month: '月',
                DayofWeek: '周',
                Year: '年'
            }],
            msg0: "通配符",
            msg1: "1. *：匹配该域的任意值；如*用在分所在的域，表示每分钟都会触发事件。",
            msg2: "2. ?：匹配该域的任意值。",
            msg3: "3. -：匹配一个特定的范围值；如时所在的域的值是10-12，表示10、11、12点的时候会触发事件",
            msg4: "4. ,：匹配多个指定的值；如周所在的域的值是2,4,6，表示在周一、周三、周五就会触发事件(1表示周日，2表示周一，3表示周二，以此类推，7表示周六)。",
            msg5: "5. /：左边是开始触发时间，右边是每隔固定时间触发一次事件，如秒所在的域的值是5/15，表示5秒、20秒、35秒、50秒的时候都触发一次事件。",
            msg6: "6. L：last，最后的意思，如果是用在天这个域，表示月的最后一天，如果是用在周所在的域，如6L，表示某个月最后一个周五。（外国周日是星耀日，周一是月耀日，一周的开始是周日，所以1L=周日，6L=周五。",
            msg7: "7. W：weekday，工作日的意思。如天所在的域的值是15W，表示本月15日最近的工作日，如果15日是周六，触发器将触发上14日周五。如果15日是周日，触发器将触发16日周一。如果15 日不是周六或周日，而是周一至周五的某一个，那么它就在15日当天触发事件。",
            msg8: "8. #：用来指定每个月的第几个星期几，如6#3表示某个月的第三个星期五",

            psg0: "示例",
            psg1: "“0 0 12 * * ?” 每天 12:00 触发事件",
            psg2: " “0 15 10  ? * *” 每天 10:15 触发事件",
            psg3: "“0 15 10 * * ?” 每天 10:15 触发事件",
            psg4: "“0 15 10 * * ? *” 每天 10:15 触发事件",
            psg5: "“0 15 10 * * ? 2005″ 2005 年的每天 10:15 触发事件",
            psg6: "“0 * 14 * * ?” 每天 14 点开始触发，每分钟触发一次，14:59 分结束",
            psg7: " “0 0/5 14 * * ?” 每天 14 点开始触发到 14:59 分结束的每 5 分钟触发一次事件",
            psg8: "“0 0/5 14,18 * * ?” 每天 14 点开始到 14:59 期间和 18 点到 18:59 期间的每 5 分钟触发一次事件",
            psg9: "“0 0-5 14 * * ?” 每天 14 点到 14:05 期间的每 1 分钟触发一次事件",
            psg10: "“0 10,44 14 ? 3 WED” 每年 3 月的星期三的 14:10 和 14:44 触发一次事件",
            psg11: "“0 15 10 ? * MON-FRI” 周一至周五的 10:15 触发一次事件",
            psg12: "“0 15 10 15 * ?” 每月 15 日 10:15 触发一次事件",
            psg13: "“0 15 10 L * ?” 每月最后一日的 10:15 触发一次事件",
            psg14: "“0 15 10 ? * 6L” 每月的最后一个星期五 10:15 触发一次事件",
            psg15: "“0 15 10 ? * 6L 2002-2005″ 2002 年至 2005 年的每月的最后一个星期五 10:15 触发一次事件",
            psg16: " “0 15 10 ? * 6#3″ 每月的第三个星期五 10:15 触发一次事件",
        }
    }
}
</script>