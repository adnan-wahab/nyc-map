const emailModal = () => (
  <>
      <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

          //onClick={() => setShowModal(false)}
      >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <form
                      class="m-4 flex"
                      onSubmit={() => {
                          console.log('submit')
                      }}
                  >
                      <input
                          class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                          placeholder="your@mail.com"
                      />
                      <button class="px-8 rounded-r-lg bg-purple-400  text-gray-800 font-bold p-4 uppercase border-purple-500 border-t border-b border-r">
                          Subscribe
                      </button>
                  </form>
              </div>
          </div>
      </div>
      <div
          onClick={() => setShowModal(false)}
          className="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
  </>
)
export default emailModal