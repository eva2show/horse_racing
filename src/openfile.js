
class FileHelper {
    constructor() {
        this.fileDom = null;
        this.inited = false;
    }
    init() {
        console.log("FileHelper========")

        if(this.inited)return;
        this.inited = true;
        let fileDom = document.createElement("input");
        fileDom.type = 'file';
        fileDom.style.display = 'none';
        document.body.appendChild(fileDom);
        this.fileDom = fileDom;
    }

    openFile() {

        if(!this.inited)this.init();
        
        let fileCancle = true;
        const { fileDom } = this;
        return new Promise((res, rej) => {

            window.addEventListener(
                'focus',
                () => {
                    setTimeout(() => {
                        if (fileCancle) {
                            res(null);
                        }
                    }, 1000)
                },
                { once: true }
            );

            fileDom.onchange = _ => {
                fileCancle = false;
                if (fileDom.files && fileDom.files.length > 0) {
                    res(fileDom.files[0])
                } else {
                    res(null);
                }
            };
            fileDom.click();
        });
    }
}


export const fileHelper = new FileHelper;