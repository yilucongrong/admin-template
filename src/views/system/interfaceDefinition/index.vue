<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small" :placeholder="$t('interfaceDefinition.interfaceCode')" v-model="listQuery.interfaceCode" class="filter-item"  @keyup.enter.native="handleQuery"/>
                    <el-input size="small" :placeholder="$t('interfaceDefinition.interfaceName')" v-model="listQuery.interfaceName" class="filter-item"  @keyup.enter.native="handleQuery"/>
                    <el-input size="small" :placeholder="$t('interfaceDefinition.externalSystem')" v-model="listQuery.externalSystem" class="filter-item"  @keyup.enter.native="handleQuery"/>
                    <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleQuery">{{ $t("table.search") }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t("table.add") }}</el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit" @click="handleUpdate">{{ $t("table.edit") }}</el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handleDelete">{{ $t("table.delete") }}</el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-setting" @click="handleconfigure">配置</el-button>
                </div>
                <el-table
                    :key="tableKey"
                    :data="list"
                    border
                    fit
                    :height="theight"
                    highlight-current-row
                    style="width: 100%;"
                    @selection-change="selectRow"
                    ref="tb"
                    size="mini"
                    cell-class-name="table-cell"
                    header-cell-class-name="header-cell">
                    <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('interfaceDefinition.interfaceCode')" prop="interfaceCode"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.interfaceName')" prop="interfaceName"></el-table-column>
                    <el-table-column show-overflow-tooltip width="100" align="left" :label="$t('interfaceDefinition.externalSystem')" prop="externalSystem"></el-table-column>
                    <el-table-column show-overflow-tooltip width="100" align="left" :label="$t('interfaceDefinition.interfaceMode')" prop="interfaceMode"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.dataType')" prop="dataType"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.interfaceFrequency')" prop="interfaceFrequency"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.interfaceDirection')" prop="interfaceDirection"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.dataType')" prop="dataType"></el-table-column>
                    <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('interfaceDefinition.isEffective')" prop="isEffective">
                        <template slot-scope="scope">
                            {{ scope.row.isEffective | statusFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip min-width="200" align="left" :label="$t('interfaceDefinition.remark')" prop="remark"></el-table-column>
                </el-table>
                <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
            </div>
            <el-dialog v-dialogDrag custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false" :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="dialogFormVisible" @close="handleClose">
                <el-form class="small-space" :model="temp" ref="temp" label-position="left" label-width="100px" :inline="true" size="mini" style="max-width: 600px; ">
                    <el-form-item :label="$t('interfaceDefinition.interfaceCode')" prop="interfaceCode">
                        <el-input v-model="temp.interfaceCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceName')" prop="interfaceName">
                        <el-input v-model="temp.interfaceName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.externalSystem')" prop="externalSystem">
                        <el-input v-model="temp.externalSystem"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceMode')" prop="interfaceMode">
                        <el-select size="small" v-model="temp.interfaceMode" placeholder="执行类型" clearable>
                            <el-option v-for="item in dt_Interface_mode"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                            <!-- <el-option label="同步" value="1"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.dataType')" prop="dataType">
                        <el-select size="small" v-model="temp.dataType" placeholder="执行类型" clearable>
                            <el-option v-for="item in dt_data_type"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                            <!-- <el-option label="同步" value="1"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.isEffective')" prop="isEffective">
                        <el-radio-group v-model="temp.isEffective">
                            <el-radio :label="0">无效</el-radio>
                            <el-radio :label="1">有效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceType')" prop="interfaceType">
                        <el-select size="small" v-model="temp.interfaceType" placeholder="执行类型" clearable>
                            <el-option v-for="item in dt_Interface_type"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceFrequency')" prop="interfaceFrequency">
                        <el-input v-model="temp.interfaceFrequency"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceDirection')" prop="interfaceDirection">
                        <el-select size="small" v-model="temp.interfaceDirection" placeholder="执行类型" clearable>
                            <el-option v-for="item in dt_Interface_direction"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.remark')" prop="remark">
                        <el-input type="textarea" :rows="2" v-model="temp.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t("table.cancel")}}</el-button>
                    <el-button v-if="dialogStatus == 'create'" type="primary" @click="create">{{ $t("table.confirm") }}</el-button>
                    <el-button v-else type="primary" @click="update">{{$t("table.confirm")}}</el-button>
                </div>
            </el-dialog>

        <!-- MQ -->
        <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   title="接口配置"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisiblepz">
            <el-form 
                     :model="temp"
                     ref="dataForm"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
                <el-form-item :label="$t('interfaceDefinition.interfaceCode')">
                    <el-input v-model="temp.interfaceCode" disabled/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceName')">
                    <el-input v-model="temp.interfaceName" disabled/>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.dataType')">
                    <el-input v-model="temp.dataType" disabled/>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.interfaceMode')" prop="interfaceMode">
                    <el-select size="small" style="width: 170px;" v-model="temp.interfaceMode" @keyup.enter.native="handleQuery" placeholder="接口方式" clearable disabled>
                        <el-option
                            v-for="item in dt_Interface_mode"
                            :key="item.dictItemKey"
                            :label="item.dictItemValue"
                            :value="item.dictItemKey"
                        ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceObject')">
                    <el-input v-model="temp.interfaceObject"/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceProgram')">
                    <el-input v-model="temp.interfaceProgram"/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.businessProgress')">
                    <el-input v-model="temp.businessProgress"/>
                </el-form-item>
            </el-form>
            <div class="oprate_btn">
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAttribute">{{$t('table.add')}}</el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handledel">{{$t('table.delete')}}</el-button>
            </div>
            <div class="table-container">
                <el-table
                    :data="listMQ"
                    border
                    fit
                    @selection-change="selectRowMQ"
                    highlight-current-row
                    style="width: 100%;"
                    height="200"
                    size="mini"
                    cell-class-name="table-cell"
                    header-cell-class-name="header-cell"
                >
                    <el-table-column type="selection" width="30" prop fixed></el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.number')" prop="number" fixed>
                        <!-- <template slot-scope="scope">
                            <el-input v-model="scope.row.rowId"></el-input>
                        </template> -->
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeName')" prop="attributeName" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.attributeName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeDesc')" prop="attributeDesc" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.attributeDesc"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.tableField')" prop="tableField" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.tableField"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.filedDesc')" prop="filedDesc" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.filedDesc"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="totalMQ>0" :total="totalMQ" :page.sync="listQueryMQ.currentPage" :limit.sync="listQueryMQ.pageSize"/>
            </div>

            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisiblepz = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="updateMQ">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
        <!-- FTP -->
        <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   title="接口配置"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisibleFTP">
            <el-form    :model="temp"
                        ref="dataForm"
                        label-position="left"
                        label-width="130px"
                        :inline="true"
                        class="demo-form-inline dialog_form">
                    <el-form-item :label="$t('interfaceDefinition.interfaceCode')">
                        <el-input v-model="temp.interfaceCode" disabled/>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceName')">
                        <el-input v-model="temp.interfaceName" disabled/>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.dataType')">
                        <el-input v-model="temp.dataType" disabled/>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceMode')" prop="interfaceMode">
                        <el-select disabled size="small" style="width: 170px;" v-model="temp.interfaceMode" @keyup.enter.native="handleQuery" placeholder="接口方式" clearable>
                            <el-option
                                v-for="item in dt_Interface_mode"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.ftpAddress')">
                        <el-input v-model="temp.ftpAddress"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.bak')">
                        <el-input v-model="temp.bak"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.folder')">
                        <el-input v-model="temp.folder"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.separators')" prop="separators">
                        <el-select size="small" style="width: 170px;" v-model="temp.separators" @keyup.enter.native="handleQuery" placeholder="接口方式" clearable>
                            <el-option
                                v-for="item in dt_separator_symbol"
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceObject')">
                        <el-input v-model="temp.interfaceObject"/>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.interfaceProgram')">
                        <el-input v-model="temp.interfaceProgram"/>
                    </el-form-item>
                    <el-form-item :label="$t('interfaceDefinition.businessProgress')">
                        <el-input v-model="temp.businessProgress"/>
                    </el-form-item>
                </el-form>
                 <div class="oprate_btn">
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAttributeFTP">{{$t('table.add')}}</el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handledelFTP">{{$t('table.delete')}}</el-button>
                </div>
                <div class="table-container">
                <el-table
                    :data="listFTP"
                    border
                    fit
                    @selection-change="selectRowFTP"
                    highlight-current-row
                    style="width: 100%;"
                    height="200"
                    size="mini"
                    cell-class-name="table-cell"
                    header-cell-class-name="header-cell"
                >
                    <el-table-column type="selection" width="30" prop fixed></el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.number')" prop="number" fixed>
                     
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeName')" prop="attributeName" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.attributeName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeDesc')" prop="attributeDesc" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.attributeDesc"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.seq')" prop="seq" fixed>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.seq"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="totalMQ>0" :total="totalMQ" :page.sync="listQueryMQ.currentPage" :limit.sync="listQueryMQ.pageSize"/>
                </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisibleFTP = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="updateFTP">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
       <!-- WebService或RFC -->
       <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   title="接口配置"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisibleRFC">
       <el-form 
                     :model="temp"
                     ref="dataForm"
                    
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
           
                <el-form-item :label="$t('interfaceDefinition.interfaceCode')">
                    <el-input v-model="temp.interfaceCode" disabled/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceName')">
                    <el-input v-model="temp.interfaceName" disabled/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.dataType')">
                    <el-input v-model="temp.dataType" disabled/>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.interfaceMode')" prop="interfaceMode">
                    <el-select disabled size="small" style="width: 170px;" v-model="temp.interfaceMode" @keyup.enter.native="handleQuery" placeholder="接口方式" clearable>
                        <el-option
                            v-for="item in dt_Interface_mode"
                            :key="item.dictItemKey"
                            :label="item.dictItemValue"
                            :value="item.dictItemKey"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.server')">
                    <el-input v-model="temp.server"></el-input>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.userName')">
                    <el-input v-model="temp.userName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.password')">
                    <el-input v-model="temp.password"></el-input>
                </el-form-item>
                <el-form-item :label="$t('interfaceDefinition.function')">
                    <el-input v-model="temp.function"/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceObject')">
                    <el-input v-model="temp.interfaceObject"/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.interfaceProgram')">
                    <el-input v-model="temp.interfaceProgram"/>
                </el-form-item>
                 <el-form-item :label="$t('interfaceDefinition.businessProgress')">
                    <el-input v-model="temp.businessProgress"/>
                </el-form-item>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="oprate_btn">
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreateTabA">{{$t('table.add')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handledelA">{{$t('table.delete')}}</el-button>
                    </div>
                    <div class="table-container">
                        <el-table
                            :data="listRFC"
                            border
                            fit
                            @selection-change="selectRowRFC"
                            ref="tb"
                            highlight-current-row
                            style="width: 100%;"
                            height="200"
                            size="mini"
                            cell-class-name="table-cell"
                            header-cell-class-name="header-cell"
                        >
                            <el-table-column type="selection" width="30" prop fixed></el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.number')" prop="number" fixed>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip label="table" prop="tableName" fixed>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.tableName"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-show="totalRFC>0" :total="totalRFC" :page.sync="listQueryRFC.currentPage" :limit.sync="listQueryRFC.pageSize"/>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="oprate_btn">
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus"  @click="handleCreateTabB">{{$t('table.add')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handledelB">{{$t('table.delete')}}</el-button>
                    </div>
                    <div class="table-container">
                        <el-table
                            :data="listWeb"
                            border
                            fit
                            @selection-change="selectRowWeb"
                            highlight-current-row
                            style="width: 100%;"
                            height="200"
                            size="mini"
                            cell-class-name="table-cell"
                            header-cell-class-name="header-cell"
                        >
                            <el-table-column type="selection" width="30" prop fixed></el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.number')" prop="number" fixed>
                            
                            </el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeName')" prop="attributeName" fixed>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.attributeName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.attributeDesc')" prop="attributeDesc" fixed>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.attributeDesc"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.tableFieldb')" prop="tableField" fixed>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.tableField"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip :label="$t('interfaceDefinition.filedDesc')" prop="filedDesc" fixed>
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.filedDesc"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-show="totalWeb>0" :total="totalWeb" :page.sync="listQueryWeb.currentPage" :limit.sync="listQueryWeb.pageSize"/>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRFC = false">{{ $t('table.cancel') }}</el-button>
                <el-button v-if="dialogStatus == 'RFC'" type="primary" @click="RFC">{{ $t("table.confirm") }}</el-button>
                <el-button v-else type="primary">{{$t("table.confirm")}}</el-button>
            </div>
        </el-dialog>
        </div>
    </div>

</template>


<script>
import * as api from "@/api/system/interfaceDefinition";
import Pagination from "@/components/Pagination";
import { mapState } from 'vuex';
import {  getDomainId } from "@/utils/auth";

    export default {
        name: "interfaceDefinition",
        components: { Pagination},
        data() {
            return {
                list: null,
                total: 0,
                theight: 0,//表格高度
                listMQ: [],
                listRFC:[],
                listWeb:[],
                listFTP:[],
                totalMQ: 0,
                totalRFC:0,
                totalWeb:0,
                flag:false,
                tableA:'',
                dialogFormVisiblepz:false,
                listQuery: {         
                    currentPage: 1,
                    pageSize: 15,          
                },
                listQueryMQ: {         
                    currentPage: 1,
                    pageSize: 10,          
                },
                listQueryRFC: {         
                    currentPage: 1,
                    pageSize: 10,          
                },
                listQueryWeb: {         
                    currentPage: 1,
                    pageSize: 10,          
                },
                listQueryFTP: {         
                    currentPage: 1,
                    pageSize: 10,          
                },
                taskUpdateStatusDTO :{
                    jobGroup:undefined,
                    jobName:undefined,
                    rowId:undefined,
                    status:undefined
                },
                temp: {
                    isEffective:1,
                    remark: undefined,
                    creator:getDomainId(),
                    updator:getDomainId(),
                    rowId:undefined
                },
                dto:{
                    configurationTableFields:null,
                    businessProgress:undefined,
                    interfaceObject:undefined,
                    interfaceProgram:undefined,
                    interfaceDefinitionId:undefined
                },
                dtf:{
                    configurationTableFields:null,
                    businessProgress:undefined,
                    interfaceObject:undefined,
                    interfaceProgram:undefined,
                    interfaceDefinitionId:undefined,
                    creator:getDomainId(),
                    updator:getDomainId(),
                    bak:undefined,
                    folder:undefined,
                    ftpAddress:undefined,
                    separators:undefined,
                },
                dta:{
                    // configurationTables:undefined,
                    businessProgress:undefined,
                    creator:getDomainId(),
                    updator:getDomainId(),
                    function:undefined,
                    interfaceDefinitionId:undefined,
                    interfaceObject:undefined,
                    interfaceProgram:undefined,
                    password:undefined,
                    server:undefined,
                    rowId:undefined
                },
                dtz:{
                    businessProgress:undefined,
                    creator:getDomainId(),
                    updator:getDomainId(),
                    function:undefined,
                    interfaceDefinitionId:undefined,
                    interfaceObject:undefined,
                    interfaceProgram:undefined,
                    password:undefined,
                    server:undefined,
                    rowId:undefined
                },
                colorCode: undefined,
                selectCode: [],
                dialogFormVisible: false,
                explainDialogFormVisible:false,
                logDialogFormVisible:false,
                dialogFormVisibleFTP:false,
                dialogFormVisibleRFC:false,
                dialogStatus: "",
                tableKey: 0,
                rules: {
                
                }
            };
        },
        computed:{
            ...mapState({
                dt_Interface_mode:state=>state.dict.dt_Interface_mode,
                dt_data_type:state=>state.dict.dt_data_type,
                dt_Interface_type:state=>state.dict.dt_Interface_type,
                dt_Interface_direction:state=>state.dict.dt_Interface_direction,
                dt_separator_symbol:state=>state.dict.dt_separator_symbol
            })
        },
        mounted(){
            this.$store.dispatch("dict/getDicData", [
               
                "dt_Interface_mode",
                "dt_data_type",
                "dt_Interface_type",
                "dt_Interface_direction",
                "dt_separator_symbol"
            ]);
            this.setTableHeight();
            //表格高度自适应
            window.onresize = () => {
                this.setTableHeight()
            };
            this.getList();
        },
        created() {
            this.getList();
        },
        filters:{
             statusFilter:function(a){
                if(a===1){
                    return "有效"
                }else{
                    return "无效"
                }
             }
        },
        methods: {
            getList() {
                api.queryRecords(this.listQuery).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.pages.count;
                });
            },
            //表格高度计算
            setTableHeight () {
                this.theight = this.$myFun.getSingleTbHeight();
            },
            handleQuery() {//查询
                this.listQuery.currentPage = 1;
                this.getList();
            },
            checked(){
                this.$refs.tb.toggleRowSelection(this.listRFC[0],true);//官网方法，重点
            },
            handleconfigure(){ //配置
                if(this.selectlistRow){
                    if(this.selectlistRow.interfaceMode=='MQ'){
                        this.dialogFormVisiblepz = true;
                        api.queryRecordpz(this.selectlistRow.rowId,this.selectlistRow.interfaceMode).then(res=>{
                            res.interfaceCode=this.selectlistRow.interfaceCode
                            res.interfaceName=this.selectlistRow.interfaceName
                            res.dataType=this.selectlistRow.dataType
                            res.interfaceMode=this.selectlistRow.interfaceMode
                            this.temp=res.data
                            this.listMQ=[]
                            if(res.data.configurationTableFields){
                                this.listMQ=res.data.configurationTableFields
                            }
                            this.listMQ.forEach((item,index)=>{
                                item.number = (this.listQueryRFC.currentPage-1)*this.listQueryRFC.pageSize+index+1
                            })   
                        })      
                    }else if(this.selectlistRow.interfaceMode=='FTP'){
                        api.queryRecordpz(this.selectlistRow.rowId,this.selectlistRow.interfaceMode).then(res=>{
                            res.interfaceCode=this.selectlistRow.interfaceCode
                            res.interfaceName=this.selectlistRow.interfaceName
                            res.dataType=this.selectlistRow.dataType
                            res.interfaceMode=this.selectlistRow.interfaceMode
                            this.temp=res.data
                            // this.temp.rowId=res.rowId 
                            this.listFTP=[]
                            if(res.data.configurationTableFields){
                                this.listFTP=res.data.configurationTableFields
                            }
                            if(this.listFTP){
                                this.listFTP.forEach((item,index)=>{
                                    item.number = (this.listQueryFTP.currentPage-1)*this.listQueryFTP.pageSize+index+1
                                })
                            }
                            
                        })
                        this.dialogFormVisibleFTP=true
                    }else if(this.selectlistRow.interfaceMode=='RFC'||this.selectlistRow.interfaceMode=='WebService'){
                        this.dialogStatus="RFC"
                        api.queryRecordpz(this.selectlistRow.rowId,this.selectlistRow.interfaceMode).then(res=>{
                            res.interfaceCode=this.selectlistRow.interfaceCode
                            res.interfaceName=this.selectlistRow.interfaceName
                            res.dataType=this.selectlistRow.dataType
                            res.interfaceMode=this.selectlistRow.interfaceMode
                            this.temp=res.data
                            if(res.data.configurationTables){
                                this.listRFC=res.data.configurationTables
                            }else{
                                this.listRFC=[]
                            }
                            if(this.listRFC){
                                this.listRFC.forEach((item,index)=>{
                                item.number = (this.listQueryRFC.currentPage-1)*this.listQueryRFC.pageSize+index+1
                            })
                            this.$nextTick(function(){
                                this.checked()
                            })
                            }
                            if(this.listWeb){
                                 this.listWeb.forEach((item,index)=>{
                                item.number = (this.listQueryRFC.currentPage-1)*this.listQueryRFC.pageSize+index+1
                            })
                            }    
                        })
                        this.dialogFormVisibleRFC = true;
                    }
                    }else{
                        this.$message({
                            title: "警告",
                            message: "请选择一条信息",
                            type: "warning"
                        });
                } 
            },
            handleAttributeFTP(){ //FTP配置新增
                let newValue = {
                    number:'',
                    attributeName: '',
                    attributeDesc:'',
                    tableField: '',
                    seq: '',
                };
                this.listFTP.push(newValue);
                this.listFTP.forEach((item,index)=>{
                    item.number = (this.listQueryFTP.currentPage-1)*this.listQueryFTP.pageSize+index+1
                })
            },
            handleAttribute(){ //MQ配置新增
                let newValue = {
                    number:'',
                    attributeName: '',
                    attributeDesc:'',
                    tableField: '',
                    filedDesc: '',
                };
                this.listMQ.push(newValue);
                this.listMQ.forEach((item,index)=>{
                 item.number = (this.listQueryMQ.currentPage-1)*this.listQueryMQ.pageSize+index+1
                })
            },
            handledel(){ //MQ配置删除
                if (this.selectlistRowMQ) {
                        this.$confirm("确认要删除该数据项吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.listMQ = this.listMQ.filter(item => {
                        let isD = true;
                        this.selectlistRowMQ.forEach((itemr) => {
                            if (itemr.rowId === item.rowId) {
                            isD = false;
                            }
                        });
                        return isD;
                        });
                        this.$message({
                        type: "success",
                        message: "删除成功"
                        });
                    }).catch(() => {
                        this.$message({
                        type: "info",
                        message: "已取消"
                        });
                    });
                } else {
                    this.$message.warning("请勾选记录！");
                    return;
                }
            },
            handledelFTP(){ //FTP配置删除
                if (this.selectlistRowFTP) {
                        this.$confirm("确认要删除该数据项吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.listFTP = this.listFTP.filter(item => {
                        let isD = true;
                        this.selectlistRowFTP.forEach((itemr) => {
                            if (itemr.rowId === item.rowId) {
                            isD = false;
                            }
                        });
                        return isD;
                        });
                        this.$message({
                        type: "success",
                        message: "删除成功"
                        });
                    }).catch(() => {
                        this.$message({
                        type: "info",
                        message: "已取消"
                        });
                    });
                } else {
                    this.$message.warning("请勾选记录！");
                    return;
                }
            },
            updateFTP(){ //配置FTP确定按钮方法
                this.listFTP.map(v=>{
                    v.interfaceDefinitionId=this.selectlistRow.rowId
                    return v
                })
                this.dtf=this.temp
                this.dtf.configurationTableFields=this.listFTP
                this.dtf.interfaceDefinitionId=this.selectlistRow.rowId
                api.addRecordFTP(this.dtf).then(()=>{
                    this.dialogFormVisibleFTP = false
                    this.$message({
                        title: "成功",
                        message: "配置成功",
                        type: "success",
                        duration: 2000
                    });
                })
            },
            updateMQ(){ //配置MQ确定按钮方法
                this.dto=this.temp
                this.dto.configurationTableFields=this.listMQ
                this.dto.interfaceDefinitionId=this.selectlistRow.rowId
                api.addRecordMQ(this.dto).then(()=>{
                    this.dialogFormVisiblepz = false
                    this.$message({
                        title: "成功",
                        message: "配置成功",
                        type: "success",
                        duration: 2000
                    });
                })
            },
            handleCreateTabA(){ //RFC或web新增
               let newValue = {
                    rowId:'',
                    tableName: '',
                };
                this.listRFC.push(newValue);
                this.listRFC.forEach((item,index)=>{
                    item.number = (this.listQueryRFC.currentPage-1)*this.listQueryRFC.pageSize+index+1
                })
                
            },
            handleCreateTabB(){ //RFC或web新增
                if(this.selectlistRowRFC){
                    let newValue = {
                        number:'',
                        attributeName: '',
                        attributeDesc:'',
                        tableField: '',
                        filedDesc: '',
                        num:this.selectlistRowRFC.number
                };
                    this.listWeb.push(newValue);
                    this.listWeb.forEach((item,index)=>{
                        item.number = (this.listQueryWeb.currentPage-1)*this.listQueryWeb.pageSize+index+1
                    })
                    this.selectlistRowRFC.configurationTableFields=this.listWeb

                }else{
                    this.$message({
                        title: "警告",
                        message: "请选择一条信息",
                        type: "warning"
                    }); 
                }
            },
            handledelA(){ //RFC或web删除
                if (this.selectlistRowRFC) {
                        this.$confirm("确认要删除该数据项吗?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.listRFC = this.listRFC.filter(item => {
                        let isD = true;
                        if (this.selectlistRowRFC.number === item.number) {
                            isD = false;
                        }
                        return isD;
                        });
                        this.$message({
                        type: "success",
                        message: "删除成功",
                        duration: 2000
                        });
                        this.listWeb=[]
                    }).catch(() => {
                        this.$message({
                        type: "info",
                        message: "已取消"
                        });
                    });
                } else {
                    this.$message.warning("请勾选记录！");
                    return;
                }
            },
            handledelB(){ //RFC或web删除
            if (this.selectlistRowWeb) {
                    this.$confirm("确认要删除该数据项吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.listWeb = this.listWeb.filter(item => {
                    let isD = true;
                    this.selectlistRowWeb.forEach((itemr) => {
                        if (itemr.rowId === item.rowId) {
                        isD = false;
                        }
                    });
                    return isD;
                    });
                    this.$message({
                    type: "success",
                    message: "删除成功",
                    duration: 2000
                    });
                }).catch(() => {
                    this.$message({
                    type: "info",
                    message: "已取消"
                    });
                });
            } else {
                this.$message.warning("请勾选记录！");
                return;
            }
        },
            handleCreate() {//新增
                this.resetTemp();
                this.dialogStatus = "create";
                this.dialogFormVisible = true;
            },
            create() {//新增确认按钮
                this.$refs.temp.validate(valid => {
                    if (valid) {
                        api.addRecord(this.temp).then(() => {
                            this.getList();
                            this.dialogFormVisible = false;
                            this.$message({
                                title: "成功",
                                message: "新增成功",
                                type: "success",
                                duration: 2000
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 获取表格选中时的数据
            selectRow(val) {
                this.selectlistRow = val[val.length - 1];
                if (val.length > 1) {
                    this.$refs.tb.clearSelection();
                    this.$refs.tb.toggleRowSelection(val.pop());
                }
            },
            selectRowMQ(val){
                this.selectlistRowMQ = val
            },
            selectRowFTP(val){
                this.selectlistRowFTP = val
            },
            selectRowRFC(val){
                this.selectlistRowRFC = val[val.length - 1];
                if (val.length > 1) {
                    this.$refs.tb.clearSelection();
                    this.$refs.tb.toggleRowSelection(val[val.length - 1]);
                    
                }
                if(this.selectlistRowRFC){
                    if(this.selectlistRowRFC.configurationTableFields){
                        this.listWeb=this.selectlistRowRFC.configurationTableFields
                    }else{
                        this.listWeb=[]
                    }
                    if(this.selectlistRowRFC.configurationTableFields!==undefined){
                      this.selectlistRowRFC.configurationTableFields.forEach((v,index)=>{
                          v.number=(this.listQueryWeb.currentPage-1)*this.listQueryWeb.pageSize+index+1
                      })
                        // this.listWeb=this.selectlistRowRFC.configurationTableFields
                    }       
                }
            },
            RFC(){  //RFC或Web配置确定按钮方法
            this.dta=this.temp
            this.dta.configurationTables=this.listRFC
            this.dta.interfaceDefinitionId=this.selectlistRow.rowId
            api.addRecordRFC(this.dta).then(()=>{
                this.dialogFormVisibleRFC = false;
                this.$message({
                    title: "成功",
                    message: "配置成功",
                    type: "success",
                    duration: 2000
                });
            })
        },
            selectRowWeb(val){
                this.selectlistRowWeb = val
            },
            handleUpdate() {//编辑弹窗
                if (this.selectlistRow) {
                    this.temp = this.selectlistRow
                    this.flag=true
                    this.dialogStatus = "update";
                    this.dialogFormVisible = true;
                } else {
                    this.$message({
                        title: "警告",
                        message: "请选择一条信息",
                        type: "warning"
                    });
                }
            },
            update() {//编辑提交
                this.$refs["temp"].validate(valid => {
                    if (valid) {
                        this.temp.updator=getDomainId()
                        api.updateRecord(this.temp).then(
                            () => {
                                this.getList();
                                this.dialogFormVisible = false;
                                this.$message({
                                    title: "成功",
                                    message: "更新成功",
                                    type: "success",
                                    duration: 2000
                                });
                            }
                        );
                    }
                });
            },
           
            handleDelete() {//删除列表
                if (this.selectlistRow) {
                    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                            api.deleteRecord(this.selectlistRow.rowId).then(() => {
                                this.getList(),
                                    this.$message({
                                        title: "成功",
                                        message: "删除成功",
                                        type: "success",
                                        duration: 2000
                                    });
                            });
                        }).catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        });
                } else {
                    this.$message({
                        title: "警告",
                        message: "请选择一条信息",
                        type: "warning"
                    });
                }
            },
            cancel() {//取消弹窗按钮
                this.dialogFormVisible = false;
            },
            resetTemp() {
                this.temp = {
                    isEffective:1,
                    remark: undefined,
                    creator:getDomainId(),
                    updator:getDomainId(),
                };
            },
            handleClose() {
                this.resetTemp();
            },
           
        }
    };
</script>
