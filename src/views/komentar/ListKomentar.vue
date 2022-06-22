<template>
  <div id="list-komentar" class="lg:px-56 lg:pt-20 lg:pb-20 pb-7">
    <!-- end Toast -->
    <div class="mb-10 mt-20 lg:mt-0 text-center lg:text-left">
      <label
        for="default-input"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Masukan Komentar</label
      >
      <input
        v-model="komentar"
        @keyup.enter="tambahKomentar"
        type="text"
        id="default-input"
        placeholder="Tambah Komentar"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          lg:w-full
          w-11/12
          mx-auto
          p-2.5
        "
      />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 md:mt-0 mt-10">
        <thead
          class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3">Komentar</th>
            <th scope="col" class="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody v-for="item in items" :key="item.id">
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="
                px-6
                py-4
                font-medium
                text-gray-900
                dark:text-white
                whitespace-nowrap
                hover:bg-gray-50
              "
            >
              {{ item.body }}
            </th>
            <td class="px-6 py-4 text-left">
              <a
                href=""
                class="font-medium text-blue-600 hover:underline"
                @click.prevent="
                  showModal = !showModal;
                  getId(item.id);
                "
                >Edit</a
              >

              <a
                href=""
                class="font-medium ml-3 text-red-600 hover:underline"
                @click="hapusKomentar(item)"
                >Hapus</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="w-full">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="
        modal
        absolute
        bg-white
        border
        shadow-xl
        px-10
        py-6
        block
        w-9/12
        h-64
        left-0
        right-0
        top-0
        bottom-0
        m-auto
      "
      v-show="showModal"
    >
      <h1 class="text-2xl text-gray-800 mt-6 mb-4">Edit Komentar</h1>
      <input
        @keyup.enter="editKomentar(idData, komen)"
        type="text"
        :id="idData"
        v-model="komen"
        :placeholder="komen"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-blue-500
          dark:focus:border-blue-500
        "
      />
      <div class="flex mt-6">
        <button
          type="button"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            mr-2
            mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700
            focus:outline-none
            dark:focus:ring-blue-800
          "
          @click.prevent="editKomentar()"
        >
          Update
        </button>
        <button
          type="button"
          class="
            py-2.5
            px-5
            mr-2
            mb-2
            text-sm
            font-medium
            text-gray-900
            focus:outline-none
            bg-white
            rounded-lg
            border border-gray-200
            hover:bg-gray-100 hover:text-blue-700
            focus:z-10 focus:ring-4 focus:ring-gray-200
            dark:focus:ring-gray-700
            dark:bg-gray-800
            dark:text-gray-400
            dark:border-gray-600
            dark:hover:text-white
            dark:hover:bg-gray-700
          "
          @click.prevent="showModal = !showModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      komentar: [],
      showModal: false,
      komen: "",
      idData: "",
    };
  },
  methods: {
    async tambahKomentar() {
      const res = await axios.post("http://localhost:3000/comments", {
        body: this.komentar,
      });
      this.items = [...this.items, res.data];
      this.komentar = "";
      this.$toast.success(`Komentar ditambahkan`);
    },

    async getId(index) {
      const res = await axios
        .get(`http://localhost:3000/comments/${index}`)
        .then();

      this.idData = res.data.id;
      this.komen = res.data.body;
    },

    async editKomentar() {
      await axios
        .put("http://localhost:3000/comments/" + this.idData, {
          body: this.komen,
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
          this.$toast.info(`Komentar diubah menjadi '${this.komen}'`);
        });
    },
    async hapusKomentar(item) {
      if (confirm("Apakah yakin komentar '" + item.body + "' akan dihapus?")) {
        await axios
          .delete(`http://localhost:3000/comments/${item.id}`)
          .then((response) => {
            console.log(response);
          });
        this.$toast.success(`Komentar telah dihapus.`);
      } else {
        this.$toast.danger(`Komentar tidak jadi dihapus.`);
      }
    },
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/comments");
      this.items = res.data;
    } catch (e) {
      // handle error
      console.log("Gagal : ", e);
    }
  },
};
</script>