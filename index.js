

async function LoadSite() {
    let Kelas = 'X';
    let Count = 1;
    const selectElement = document.getElementById('Kelas');

    let OptionSelectKelas = `<option value=''></option>`;
    while (Kelas == 'X' || Kelas == 'XI' || Kelas == 'XII') {
        if(Count <= 8 && Kelas == 'X') {
            OptionSelectKelas += `<option value='${Kelas} E.${Count}'>${Kelas} E.${Count}</option>`;
            Count++;
        } else if(Count <= 8) {
            OptionSelectKelas += `<option value='${Kelas} F.${Count}'>${Kelas} F.${Count}</option>`;
            Count++;
        } else {
            Kelas += 'I';
            Count = 1;
        }
    }
    selectElement.innerHTML = OptionSelectKelas;

    const ExistlocalStorage = JSON.parse(localStorage.getItem('data'))
    console.log(ExistlocalStorage)

    if (ExistlocalStorage) {
        console.log(ExistlocalStorage.Setting.ModeTema)
        if (ExistlocalStorage.Setting.GunakanSistemLoad === true) {
            await LoadBody(ExistlocalStorage.Setting.ModeTema)
        }
    }

    LoadlocalStorage();

    async function LoadBody(Site) {
        const LoadInnerHTML = await fetch(Site, {
            method: "GET"
        });
        const Stringify = await LoadInnerHTML.text()
        const body = document.body
        body.innerHTML = Stringify
    }

    function LoadlocalStorage() {
        const localStorageLoad = localStorage.getItem('data');
        if (localStorageLoad) {
            const ExistlocalStorageLoad = JSON.parse(localStorageLoad);
            console.log(ExistlocalStorageLoad);
            DataLama = ExistlocalStorageLoad.Data;
            SettingLama = ExistlocalStorageLoad.Setting;
            document.getElementById('NamaLengkap').value = decodeURIComponent(ExistlocalStorageLoad.Data.NamaLengkap);
            document.getElementById('Kelas').value = decodeURIComponent(ExistlocalStorageLoad.Data.Kelas);
            document.getElementById('Alamat').value = decodeURIComponent(ExistlocalStorageLoad.Data.Alamat);
            document.getElementById('NomorWA').value = decodeURIComponent(ExistlocalStorageLoad.Data.NomorWA);
            document.getElementById('SingkatHasil').checked = ExistlocalStorageLoad.Setting.SingkatHasil;
            document.getElementById('AbaikanKosong').checked = ExistlocalStorageLoad.Setting.AbaikanKosong;
            document.getElementById('AdakanTanggal').checked = ExistlocalStorageLoad.Setting.AdakanTanggal;
            document.getElementById('GunakanSistemLoad').checked = ExistlocalStorageLoad.Setting.GunakanSistemLoad
            UpdateHasil(DataLama, SettingLama);
        }
    }
};



(function LoadAndCheckData() {
    LoadSite()
    let DataLama = {
        NamaLengkap: '',
        Kelas: '',
        Alamat: '',
        NomorWA: ''
    };

    let SettingLama = {
        SingkatHasil: document.getElementById('SingkatHasil').checked,
        AbaikanKosong: document.getElementById('AbaikanKosong').checked,
        AdakanTanggal: document.getElementById('AdakanTanggal').checked,
        GunakanSistemLoad: document.getElementById('GunakanSistemLoad').checked,
        ModeTema: document.getElementById('ModeTema').value,
    }

    setInterval(() => {

        const DataBaru = {
            NamaLengkap: encodeURIComponent(document.getElementById('NamaLengkap').value),
            Kelas: encodeURIComponent(document.getElementById('Kelas').value),
            Alamat: encodeURIComponent(document.getElementById('Alamat').value),
            NomorWA: encodeURIComponent(document.getElementById('NomorWA').value)
        };
        const SettingBaru = {
            SingkatHasil: document.getElementById('SingkatHasil').checked,
            AbaikanKosong: document.getElementById('AbaikanKosong').checked,
            AdakanTanggal: document.getElementById('AdakanTanggal').checked,
            GunakanSistemLoad: document.getElementById('GunakanSistemLoad').checked,
            ModeTema: document.getElementById('ModeTema').value
        };

        if (JSON.stringify(SettingBaru) != JSON.stringify(SettingLama) || JSON.stringify(DataBaru) != JSON.stringify(DataLama)) {
            console.log('Difference detected, both are loaded!')
            SettingLama = SettingBaru;
            DataLama = DataBaru;
            UpdateHasil(DataLama, SettingLama);
            SavelocalStorage();
        }

    }, 100);
    function SavelocalStorage() {
        const data = {
            Data: DataLama,
            Setting: SettingLama
        };
        
        localStorage.setItem('data', JSON.stringify(data))
    }


})()

function UpdateHasil(object, setting) {
    const TempatHasilTidurNotShort = document.getElementById('Hasil Jam Malam Div');
    const TempatHasilShubuhNotShort = document.getElementById('Hasil Shubuh Div');
    TempatHasilTidurNotShort.innerHTML = '';
    TempatHasilShubuhNotShort.innerHTML = ''
    const LinkJamMalam = 'https://docs.google.com/forms/d/e/1FAIpQLSfsgvEN-xVkybaDbRYqm8poiRj3FmWzBpkpZYefm27DF5v46w/viewform?usp=pp_url&entry.366340186=' + object.NamaLengkap + '&entry.1620738564=' + object.Kelas + '&entry.1073996542=' + object.Alamat + '&entry.1101568364=' + object.NomorWA
    const LinkShubuh = 'https://docs.google.com/forms/d/e/1FAIpQLSeNONTXFATCnSgcJaKYwrmNpaB0yggTUDgtekPaoG0BJrhpzQ/viewform?usp=pp_url&entry.262102708=' + object.NamaLengkap + '&entry.1448140492=' + object.Kelas + '&entry.1936882981=' + object.Alamat + '&entry.1331619608=' + object.NomorWA

    if (!Object.values(object).includes('') || setting.AbaikanKosong === true) {
        const Hasil = document.createElement('a');
        Hasil.href = LinkJamMalam;
        const Hasil2 = Hasil.cloneNode(true);
        Hasil2.href = LinkShubuh;
        if (setting.SingkatHasil === true && setting.AdakanTanggal === false) {
            Hasil.textContent = `Link Shortcut Pemantauan Jam Malam`;
            Hasil2.textContent = 'Link Shortcut Pemantauan Shubuh';
            TempatHasilTidurNotShort.appendChild(Hasil);
            TempatHasilShubuhNotShort.appendChild(Hasil2);
        } else if (setting.SingkatHasil === false && setting.AdakanTanggal === false) {
            Hasil.textContent = LinkJamMalam;
            Hasil2.textContent = LinkShubuh;
            TempatHasilTidurNotShort.appendChild(Hasil);
            TempatHasilShubuhNotShort.appendChild(Hasil2);
        } else {
            MakeRedirectLink();
        }


    } else {
        const Hasil = document.createElement('span');
        const Hasil2 = Hasil.cloneNode(true);
        if (setting.SingkatHasil === true) {
            Hasil.textContent = Hasil2.textContent = `Data belum terisi penuh`;
        } else {  
            const LinkJamMalamGakLengkap = 'https://docs.google.com/forms/d/e/1FAIpQLSfsgvEN-xVkybaDbRYqm8poiRj3FmWzBpkpZYefm27DF5v46w/viewform?usp=pp_url&entry.366340186=' + (object.NamaLengkap || redcolormaker('NamaLengkap')) + '&entry.1620738564=' + (object.Kelas || redcolormaker('Kelas')) + '&entry.1073996542=' + (object.Alamat || redcolormaker('Alamat'))  + '&entry.1101568364=' + (object.NomorWA || redcolormaker('NomorWA'))
            const LinkShubuhGakLengkap = 'https://docs.google.com/forms/d/e/1FAIpQLSeNONTXFATCnSgcJaKYwrmNpaB0yggTUDgtekPaoG0BJrhpzQ/viewform?usp=pp_url&entry.262102708=' + (object.NamaLengkap || redcolormaker('NamaLengkap')) + '&entry.1448140492=' + (object.Kelas || redcolormaker('Kelas')) + '&entry.1936882981=' + (object.Alamat || redcolormaker('Alamat')) + '&entry.1331619608=' + (object.NomorWA || redcolormaker('NomorWA'))
            Hasil.innerHTML = LinkJamMalamGakLengkap;
            Hasil2.innerHTML = LinkShubuhGakLengkap;
        }
        TempatHasilTidurNotShort.appendChild(Hasil);
        TempatHasilShubuhNotShort.appendChild(Hasil2);
    }
        
    function redcolormaker(text) {
        const textContent = `<span class='gak-lengkap'>` + text + `</span>`
        return textContent
    }   

    function MakeRedirectLink() {
        const Hasil = document.createElement('a')

        const Hasil2 = Hasil.cloneNode(true)

        if (setting.SingkatHasil === true) {
            Hasil.textContent = 'Link Shortcut Pemantauan Jam Malam +Tanggal';
            Hasil2.textContent = 'Link Shortcut Pemantauan Shubuh +Tanggal';
        } else {
            Hasil.textContent = `https://${window.location.host}/SmanndungFormShortcut/Redirect/redirect1.html`;
            Hasil2.textContent = `https://${window.location.host}/SmanndungFormShortcut/Redirect/redirect2.html`;
        }
        Hasil.href = `https://${window.location.host}/SmanndungFormShortcut/Redirect/redirect1.html`;
        Hasil2.href = `https://${window.location.host}/SmanndungFormShortcut/Redirect/redirect2.html`;;

        TempatHasilTidurNotShort.appendChild(Hasil);
        TempatHasilShubuhNotShort.appendChild(Hasil2);
    }
}

function closesetting() {
    const settinggui = document.getElementById('setting-gui');
    settinggui.className = 'setting-gui-frame hidesetting'
}

function opensetting() {
    const settinggui = document.getElementById('setting-gui');
    settinggui.className = 'setting-gui-frame showsetting'
}