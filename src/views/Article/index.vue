<template>
    <div>
        <div>
            <span style="margin: 0 10px">筛选</span>
            <el-select v-model="authorValue" filterable placeholder="请选择作者" @change="authorOpFn(authorValue)">
                <el-option
                    v-for="item in authorOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                >
                </el-option>
            </el-select>
            <el-select v-model="stemfromValue" filterable placeholder="请选择来源">
                <el-option
                    v-for="item in stemfromOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                >
                </el-option>
            </el-select>
        </div>
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" prop="title" width="100"></el-table-column>
            <el-table-column label="作者" prop="author" width="80"></el-table-column>
            <el-table-column label="发布时间" prop="createTime" width="160"></el-table-column>
            <el-table-column label="类别" prop="stemfrom" width="80"></el-table-column>
            <el-table-column label="阅读量" prop="read" width="100"></el-table-column>
            <el-table-column label="点赞数" prop="star" width="100"></el-table-column>
            <el-table-column label="评论数" prop="comment" width="100"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="update(scope.row)" type="primary" size="mini"
                        >编辑</el-button
                    >
                    <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页按钮 -->
        <el-pagination
            background
            layout="prev,pager,next"
            :total="count"
            :page-size="pageSize"
            :current-page="page"
            @current-change="changePage"
            style="margin-top: 20px"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
            page: 1,
            pageSize: 0,
            count: 0,
            authorOptions: [
                {
                    label: '全部',
                }
            ],
            authorValue: '',
            stemfromOptions: [
                {
                    label: '全部',
                }
            ],
            stemfromValue: '',
        };
    },
    created() {
        this.getData();
        //查询所有作者
        this.getAllAuthor()
        this.getAllStemfrom()
    },
    methods: {
        getData(param) {
          let argument={}
            if(param){
              argument = {page: this.page,author: param}
            }else{
              argument = {page: this.page}
            }
            this.$http({
                path: '/article/findall',
                method: 'post',
                params: argument
                // params: {
                //     page: this.page,
                //     // author: this.$store.state.user.username,
                // },
            }).then((res) => {
                this.articles = res.data.result;
                this.page = res.data.page;
                this.pageSize = res.data.pageSize;
                this.count = res.data.count;
            });
        },
        update(row) {
            this.$router.push({
                path: '/admin/article/update',
                query: {
                    _id: row._id,
                },
            });
        },
        del(row) {
            console.log('del', row);
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            })
            .then(() => {
                this.$http({
                    path: '/article/del',
                    method: 'post',
                    params: {
                        _id: row._id,
                    },
                }).then((res) => {
                    this.$message({
                        message: res.data.msg,
                        type: res.data.code === 200 ? 'success' : 'error',
                    });
                    if (res.data.code === 200) {
                        this.getData();
                    }
                });
            })
            .catch(() => {});
        },
        //查询所有作者
        getAllAuthor(){
            this.$http({
                path: '/article/author',
                method: 'get',
            }).then((res) => {
                this.authorOptions.push(...res.data.reslut)
                console.log('authorOptions',this.authorOptions)
            });
        },
        //查询所有文章类别
        getAllStemfrom(){
            this.$http({
                path: '/article/stemfrom',
                method: 'get',
            }).then((res) => {
                this.stemfromOptions.push(...res.data.reslut)
                console.log('stemfromOptions',this.stemfromOptions)
            });
        },
        changePage(page) {
            this.page = page;
            this.getData();
        },
        authorOpFn(value){
          console.log(value)
          if(value === '全部'){
            this.getData();
          }else{
            this.getData(value);
          }
        }
    },
};
</script>

<style lang="less" scoped></style>
