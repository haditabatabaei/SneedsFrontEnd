<template>
    <div class="pagination gadugiFont">
        <button v-if="currentPageNumber != 1"
                class="pagination-button"
                @click="goPrevPage">
            <i class="material-icons">keyboard_arrow_left</i>
        </button>
        <button v-else
                class="pagination-button pagination-button--disabled"
                disabled>
            <i class="material-icons">keyboard_arrow_left</i>
        </button>

        <button class="pagination-button"
                :class="[{'pagination-button--active' : currentPageNumber === number}]"
                v-for="number in Number(pagesNeeded)" @click="goPage(number)">
            {{number}}
        </button>

        <button v-if="currentPageNumber != pagesNeeded"
                class="pagination-button"
                @click="goNextPage">
            <i class="material-icons">keyboard_arrow_right</i>
        </button>
        <button v-else
                class="pagination-button pagination-button--disabled"
                disabled>
            <i class="material-icons">keyboard_arrow_right</i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        data() {
            return {
                currentPageNumber: 1,
            }
        },
        props: {
            defaultCurrentPage: {
                type: Number,
                default: () => 1
            },
            allItemsCount: {
                type: Number,
                default: () => 1
            },
            itemsPerPage: {
                type: Number,
                default: () => 1
            }
        },
        computed: {
            pagesNeeded() {
                if (this.allItemsCount % this.itemsPerPage === 0) {
                    return Math.floor(this.allItemsCount / this.itemsPerPage);
                } else {
                    return Math.floor(this.allItemsCount / this.itemsPerPage) + 1;
                }
            },
        },
        methods: {
            goPage(pageNumber) {
                if (pageNumber <= 1) {
                    this.currentPageNumber = 1;
                } else if (pageNumber >= this.pagesNeeded) {
                    this.currentPageNumber = this.pagesNeeded;
                } else {
                    this.currentPageNumber = pageNumber;
                }
                this.$emit('page-switched', this.currentPageNumber);
            },
            goPrevPage() {
                this.goPage(this.currentPageNumber - 1);
            },
            goNextPage() {
                this.goPage(this.currentPageNumber + 1);
            }
        },
        created() {
            this.currentPageNumber = this.defaultCurrentPage;
        }
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        background-color: white;
        border-radius: 10px;
        padding: 15px 0;
        border: 1px solid #ccc;
    }

    .pagination-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: 1px solid #777;
        color: #777;
        font-size: 14px;
        height: 30px;
        width: 30px;
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer;
    }

    .pagination-button i {
        font-size: 14px;
    }

    .pagination-button:hover {
        color: #8C3DDB;
        border-color: #8C3DDB;
    }

    .pagination-button--active {
        color: white;
        background-color: #8C3DDB;
        border: none;
    }

    .pagination-button--disabled {
        color: #ccc;
        border-color: #ccc;
    }
</style>