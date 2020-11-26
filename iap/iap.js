import {Alert} from 'react-native';
import Iaphub from 'react-native-iaphub';

class IAPStore {

	isInitialized = false;
	skuProcessing = null;
	productsForSale = null;
	activeProducts = null;

	// Init IAPHUB
	async init() {
		try {
			// Init iaphub
			await Iaphub.init({
				// The app id is available on the settings page of your app
				appId: "5fbc8ec1c086540e9a8aebb5",
				// The (client) api key is available on the settings page of your app
				apiKey: "V7KolpkL7apFXcACjgwcjQcTawU49bkm",
				// The environment is used to determine the webhooks configuration ('production', 'staging', 'development')
				environment: "production"
			});
			// Iaphub is now initialized and ready to use
			this.isInitialized = true;
		} catch (err) {
			console.error(err);
			// The init has failed (the error code is available in the 'err.code' property)
			// You probably forgot to specify an option (appId, apiKey...)
			// Or the user is not allowed to make payments, IOS only (Error code: 'billing_disabled')
			// Or the billing system is unavailable, it may be a problem with the device or Itunes/Play Store is down (Error code: 'billing_unavailable')
			// Or it is an unknown error, probably the native library of react-native-iap that is not installed properly (Error code: 'billing_error')
		}
	}

	// Set user id
	async setUserId(userId) {
		console.log('>>>>>>>before setUserId');
		Iaphub.setUserId(userId);
		console.log('>>>>>>>after setUserId');

	}

	// Get products for sale
	async getProductsForSale() {
		console.log('>>>>before iap getProductsForSale', this.activeProducts);

		this.productsForSale = await Iaphub.getProductsForSale();
		console.log('>>>>iap getProductsForSale', this.activeProducts);

	}

	// Get active products
	async getActiveProducts() {
		console.log('>>>>before iap getActiveProducts', this.activeProducts);

		this.activeProducts = await Iaphub.getActiveProducts();
		console.log('>>>>iap getActiveProducts', this.activeProducts);
	}

	// Call this method when an user click on one of your products
	async buy(productSku) {
		try {
			this.skuProcessing = productSku;
			var transaction = await Iaphub.buy(productSku, {onReceiptProcess: () => console.log('-> Processing receipt')});
			this.skuProcessing = null;
			// The webhook could not been sent to my server
			if (transaction.webhookStatus == "failed") {
				Alert.alert(
					"Purchase delayed",
					"Your purchase was successful but we need some more time to validate it, should arrive soon! Otherwise contact the support (ezpass111111@gmail.com)"
				);
			}
			// Everything was successful! Yay!
			else {
				Alert.alert(
					"Purchase successful",
					"Your purchase has been processed successfully!"
				);
			}
			// Refresh the user to update the products for sale
			try {
				await this.getActiveProducts();
				await this.getProductsForSale();
			} catch (err) {
				console.error(err);
			}
		} catch (err) {
			this.skuProcessing = null;
			// Purchase popup cancelled by the user (ios only)
			if (err.code == "user_cancelled") return
			// Couldn't buy product because it has been bought in the past but hasn't been consumed (restore needed)
			else if (err.code == "product_already_owned") {
				Alert.alert(
					"Product already owned",
					"Please restore your purchases in order to fix that issue",
					[
						{text: 'Cancel', style: 'cancel'},
						{text: 'Restore', onPress: () => Iaphub.restore()}
					]
				);
			}
			// The payment has been deferred (awaiting approval from parental control)
			else if (err.code == "deferred_payment") {
				Alert.alert(
					"Purchase awaiting approval",
					"Your purchase is awaiting approval from the parental control"
				);
			}
			// The receipt has been processed on IAPHUB but something went wrong
			else if (err.code == "receipt_validation_failed") {
				Alert.alert(
					"We're having trouble validating your transaction",
					"Give us some time, we'll retry to validate your transaction ASAP!"
				);
			}
			// The receipt hasn't been validated on IAPHUB (Could be an issue like a network error...)
			else if (err.code == "receipt_request_failed") {
				Alert.alert(
					"We're having trouble validating your transaction",
					"Please try to restore your purchases later (Button in the settings) or contact the support (ezpass111111@gmail.com)"
				);
			}
			// Couldn't buy product for many other reasons (the user shouldn't be charged)
			else {
				Alert.alert(
					"Purchase error",
					"We were not able to process your purchase, please try again later or contact the support (ezpass111111@gmail.com)"
				);
			}
		}
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