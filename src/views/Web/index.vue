<template>
    <div class="content">
        <div class="top-banner">
            <span class="demonstration">banner</span>
            <el-carousel height="250px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <div class="banner-img">{{ item }}</div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-row>
            <el-card v-for="item in articles">
                <div class="box-card">
                    <div class="cover-img"><img :src="item.coverImg" alt="" /></div>
                    <div class="right">
                        <div class="cont">
                            <span class="title">{{ item.title }}</span>
                            <div class="desc">
                                {{ item.desc }}
                            </div>
                        </div>
                        <div class="bottom">
                            <el-tag>{{ item.stemfrom }}</el-tag>
                            <span class="date">{{ item.createTime }}</span>
                            <span class="read"
                                ><i class="el-icon-tickets">{{ item.read }}阅读</i></span
                            >
                            <span class="comment"
                                ><i class="el-icon-edit">{{ item.comment }}评论</i></span
                            >
                            <span class="star"
                                ><i class="el-icon-star-off">{{ item.star }}点赞</i></span
                            >
                            <span class="avatar" v-for="i in item.user"
                                ><img :src="i.avatar" alt=""
                            /></span>
                            <span style="margin-left: -10px;" class="author" v-for="i in item.user">作者{{ i.username }}</span>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-row>

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
            form: {
                _id: '',
                id: '',
                title: '',
                desc: '',
                stemfrom: '',
                createTime: '',
                author: '',
                avatar: 'http://localhost:3000/uploads/20220112/myfile-1641917135372-sohucs.jpg',
                coverImg: '',
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData(param) {
            this.$http({
                path: '/web/findall',
                method: 'post',
                params: {
                    page: this.page,
                },
            }).then((res) => {
                this.articles = res.data.result;
                this.page = res.data.page;
                this.pageSize = res.data.pageSize;
                this.count = res.data.count;
                console.log(this.articles[0].user[0].username);
            });
        },
        changePage(page) {
            this.page = page;
            this.getData();
        },
    },
};
</script>

<style lang="less" scoped>
.el-card {
    margin-bottom: 15px;
}
.content {
    margin: 0 150px;
    .top-banner {
        margin: 20px 0;

        .banner-img {
            width: 100%;
            height: 100%;
            background-color: pink;
        }
    }
    .box-card {
        width: 100%;
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
        .cover-img {
            width: 150px;
            height: 150px;
            // background-color: powderblue;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            width: 81%;
            // background-color: royalblue;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .cont {
                padding: 0px 15px;
                height: 100%;
                // background-color: salmon;
                .title {
                    font-size: 20px;
                    color: #28b6d9;
                }
            }
            .bottom {
                padding: 0 0;
                // background-color: sandybrown;
                height: 30px;
                // text-align: center;
                // display: table-cell;
                // vertical-align: middle;
                .el-tag {
                    height: 30px;
                }
                .avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;

                    img {
                        vertical-align: top;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: #8b8b8b solid 1px;
                    }
                }
                span {
                    font-size: 10px;
                    margin: 0 15px;
                }
            }
        }
    }
}
</style>
