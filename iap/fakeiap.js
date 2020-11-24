class IAPStore {

	isInitialized = false;
	skuProcessing = null;
	productsForSale = null;
    activeProducts = null;
    isBought = false;

	// Init IAPHUB
	async init() {
		this.isInitialized = true;
	}

	// Set user id
	async setUserId(userId) {
	
	}

	// Get products for sale
	async getProductsForSale() {
		this.productsForSale = [{sku: '123'}, {sku: 'saa-c02-bundle'}]
	}

	// Get active products
	async getActiveProducts() {
        console.log('>>>>getting new active products', this.isBought);

		if(this.isBought) {
            this.activeProducts = [{sku: 'saa-c02-bundle'}];
            return;
        } 
        this.activeProducts = [];
	}

	// Call this method when an user click on one of your products
	async buy(productSku) {
        this.isBought = true;
        console.log('>>>>bought true');
        await this.getActiveProducts();
	}

	// Call this method to restore the user purchases (you should have a button, it is usually displayed on the settings page)
	async restore() {
		await Iaphub.restore();
		await Iaphub.getActiveProducts();
		await Iaphub.getProductsForSale();
		Alert.alert("Restore", "Purchases restored");
	}

}

export default new IAPStore();