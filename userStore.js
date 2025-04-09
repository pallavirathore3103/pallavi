import { configure, makeAutoObservable, runInAction } from "mobx"

import { toast } from "react-toastify"
import { axiosInstance } from "../config/axiosInstance";
import secureLocalStorage from "react-secure-storage";
class WebsiteStore {
  loading = false
  data = {
    order:[]
  }
  globalWalletAddress = localStorage.getItem('currentWalletAddress') || null;
  errors = {}
  constructor() {
    makeAutoObservable(this);
    configure({
      useProxies: "never"
    })
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }
  toggleLoadingApply = (toggle) => {
    this.loadingApply = toggle
  }
  setGlobalWalletAddress = (address) => {
    this.globalWalletAddress = address;
    if (address) {
      localStorage.setItem('currentWalletAddress', address);
    } else {
      localStorage.removeItem('currentWalletAddress');
    }
  }

  async login(param) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post("login", param)
      
    if (response?.token) {
      secureLocalStorage.setItem("authToken", response?.token); // Store token securely
    }
      return response.data;
    }
    catch (err) {
      if (err?.request?.status === 401) {
        // window.location.reload()
      }
      console.log(err)
    }
    finally {
      this.toggleLoading(false);
    }
  }
 
  async submitForm(param) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post("/add-whitelist", param)
      return response.data;
    }
    catch (err) {
      if (err?.request?.status === 401) {
        // window.location.reload()
      }
      console.log(err)
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async getSpin(walletAddress) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post("/get-spin-records", walletAddress);
      if (response) {
        return response?.data?.data;
      }
    } catch (err) {
      if (err?.request?.status === 401) {
        // Handle unauthorized access
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      this.toggleLoading(false);
    }
  }
  
  async getOrder() {
    console.log("log");
    
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get("/orders");
      runInAction(()=>{
        this.data.order=response?.data?.orders;
      })
    }
    
    catch (err) {
      if (err?.request?.status === 401) {
        // Handle unauthorized access
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      this.toggleLoading(false);
    }
  }
  
  
}
const websiteStore = new WebsiteStore();
export default websiteStore;
