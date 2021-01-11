********************************************  Devexpress ************************************************

********************  Simple Form *************************
import { DxTextBox, DxTextArea} from 'devextreme-vue';
<div class="form">
	<div class="dx-fieldset">
		<div class="dx-fieldset-header">Simple Field Set</div>
		<div class="dx-field">
			<div class="dx-field-label">Full Name</div>
			<div class="dx-field-value-static">Kevin Carter</div>
		</div>
		<div class="dx-field">
			<div class="dx-field-label">Position</div>
		<div class="dx-field-value-static">Shipping Manager</div>
		</div>
	</div>
	<div class="dx-fieldset">
		<div class="dx-fieldset-header">Field Set with DevExtreme Widgets</div>
		<div class="dx-field">
			<div class="dx-field-label">Address</div>
			<DxTextBox class="dx-field-value" value="424 N Main St."/>
		</div>
		<div class="dx-field">
			<div class="dx-field-label">City</div>
			<DxTextBox class="dx-field-value" value="San Diego"/>
		</div>
	</div>
	<div class="dx-fieldset" id="notes-container">
		<div class="dx-fieldset-header">Field Set with Custom Value Width</div>
		<div class="dx-field">
			<div class="dx-field-label">Notes</div>
			<DxTextArea class="dx-field-value" :height="80" value="Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months. When not in the office, he is usually on the basketball court playing pick-up games."/>
		</div>
	</div>
</div>

********************  Auto Render Form *************************
import { DxForm, DxGroupItem, DxSimpleItem } from 'devextreme-vue/form';
<template>
	<div class="widget-container">
		<DxForm
			id="form"
			:form-data="formData"
			:read-only="readOnly"
			:show-colon-after-label="showColon"
			:label-location="labelLocation"
			:min-col-width="minColWidth"
			:col-count="colCount"
			:width="width"
		/>
	</div>
</template>

********************  Auto Render Form / Groups *************************
https://js.devexpress.com/Documentation/Guide/Widgets/Form/Organize_Simple_Items/In_Groups/
import { DxForm, DxGroupItem, DxSimpleItem, DxLabel } from 'devextreme-vue/form';
import DxTextArea from 'devextreme-vue/text-area';
import DxCalendar from 'devextreme-vue/calendar';

<template>
	<DxForm :form-data="employee">
		<DxGroupItem caption="Personal Data">
			<DxSimpleItem data-field="firstName" />
			<DxSimpleItem data-field="lastName" />
			<DxSimpleItem 
				data-field="birth_date"
				editor-type="dxCalendar"
				:editor-options="calendarOptions" />
		</DxGroupItem>
		<DxGroupItem caption="Contacts">
			<DxSimpleItem data-field="phone">
				<DxLabel text="Show the Phone Number" />
			</DXSimpleItem>
			<DxSimpleItem 
				data-field="description" 
				editor-type="dxTextArea"
				:editor-options="{ height: 90 }" />
		</DxGroupItem>
	</DxForm>
</template>
<script>
	data: () {
		return {
			const employee = {
			firstName: 'John',
			lastName: 'Heart',
			position: 'CEO',
			phone: '+1(213) 555-9392',
			email: 'jheart@dx-email.com'
			},
			calendarOptions: { value: new Date() },
			textAreaOptions: { placeholder: 'Add notes...' }
		}
	}
</script>

******************** Text Box *************************

TextBox modes:
Accepted Values: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'


******************** Accessing Methods on Widgets *************************
Add to widget
@initialized="saveProfileFormInstance"
Create Method to save instance
saveProfileFormInstance(e) {
	this.profileFormInstance = e.component
}
Access the methods by:  this.profileFormInstance.focus()

     ----- or ------

ref="profileForm"
let profileRef = this.$refs['profileForm'].instance
profileRef.focus()


******************** Dynamically Create Elements with JQuery  ************************* 
$(function () {
	let comp = $("#btnContainer").dxButton({
		text: "Click me!",
		onClick: function () {
				alert("Hello world!");
		}
	});
	console.log('comp', comp)
});

********************  Validation Rules *************************
<DxRequiredRule message="Email is required"/>
<DxEmailRule message="Email is invalid"/>
<DxAsyncRule
	:validation-callback="asyncValidation"
	message="Email is already registered"
/>
<DxCompareRule
	:comparison-target="passwordComparison"
	message="Password and Confirm Password do not match"
/>
<DxPatternRule
	:pattern="namePattern"
	message="Do not use digits in the Name"
/>
** Validate directly from submit button **
onLoginClick(e) {
	let validate = e.validationGroup.validate();
}
** Validate Programatically **
 methods: {
	validateGroup() {
		this.validationGroup.validate();
	}
},
computed: {
	validationGroup: function() {
		return this.$refs[this.groupRefKey].instance;
	}
}


********************  Datebox *************************
https://js.devexpress.com/Demos/WidgetsGallery/Demo/DateBox/Formatting/Vue/Light/
Format
<DxDateBox
	:show-clear-button="true"
	:use-mask-behavior="true"
	:value="date"
	placeholder="Tuesday, 16 of Oct, 2018 14:52"
	display-format="EEEE, d of MMM, yyyy HH:mm"
	type="datetime"
/>
types
date - the widget displays only the date;
time - the widget displays only the time;
datetime - the widget displays both the date and time.

let newDate = e.value
let ISODate = newDate.toISOString()
let djangoTime = ISODate.split('T')[0]
this.formData.sale_expires = djangoTime

********************  Files  *************************
<form
	id="form"
	ref="invFormFilesRef"
	method="post"
	action=""
	enctype="multipart/form-data"
> </form>
const form = this.$refs.invFormFilesRef[0].files;
console.log('form', form);

********************  Datagrid Options  *************************
Column types:
Accepted Values: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
Date-time values stored as strings should have one of the following formats: "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy-MM-ddTHH:mm:ssx" or "yyyy-MM-ddTHH:mm:ss".

Format Cells
Accepted Values: 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime'


********************  proper Rows and Cols  *************************
<div class="container">
	<div class="row">
		<div class="title">Title Here</div>
		<div class="col-50p">			
		</div>
		<div class="col-50p">
		</div>
	</div>
	<div class="row">
		<div class="title">Title Here</div>
		<div class="col-50p">			
		</div>
		<div class="col-50p">
		</div>
	</div>
</div>

******************** DxValidator Groups with separate button  ************************* 
<template>
    <DxTextBox>
        <DxValidator
            :validation-group="validationGroupName">
            <DxAsyncRule
                :validation-callback="validateAsync"
            />
        </DxValidator>
    </DxTextBox>
 
    <DxDateBox>
        <DxValidator
            :validation-group="validationGroupName">
            <DxAsyncRule
                :validation-callback="validateAsync"
            />
        </DxValidator>
    </DxDateBox>
 
    <DxButton
        :validation-group="validationGroupName"
        @click="validateGroup()"
    />
</template>

******************** DropDown with List of Objects  ************************* 
<DxDropDownBox
	:data-source="GET_DATACOM_LIST"
	:value.sync="selectedDatacom"
	placeholder="Select a value..."
	display-expr="dba_name"
	@value-changed="dxDropdownSelection($event)"
>
	<DxList
		:data-source="GET_DATACOM_LIST"
		:height="400"
		:selected-items.sync="selectedDatacom"
		selection-mode="single"
		display-expr="dba_name"> 
		//Or use template below
		<!-- <template #item="{ data: item }">
			{{ item.dba_name }}
		</template> -->
	</DxList>
</DxDropDownBox>
methods: {
	dxDropdownSelection(e) {
		e.component.close()
	}
}

******************** Field with Label  ************************* 
<div class="field">
	<div class="label">
		Label Text here
	</div>  
	<div class="content">
		<p>input field here</p>
	</div>
</div>

******************** Vue Async Component  ************************* 
// For use when a component is hidden and shown by a toggle NOT becasue it is loading date from Vuex
const dataTableComponent = import("@/components/tables/data-table-component")
components: {
		dataTableComponent: () => ({
			component: dataTableComponent,
			loading: LoadingState,
			error: ErrorState,
			delay:100,
			timeout: 5000
		})
  },


******************** Event bus  ************************* 
//Send Event
import { bus } from '@/services/event-bus';
bus.$emit("INIT_POS", {id: 24})

//Receive Event in Computed or mounted
bus.$on('INIT_POS', val => {
	console.log('val', val)
});
******************** Screen Messages  ************************* 
<div class="row">
	<div class="message success">
		<div class="message-text">
			This is the test message
		</div>
	</div>
</div>

******************** programatic Dialogs  ************************* 
Vue.prototype.$dialog.confirm({
	position: 'bottom-left',
	text: 'Do you really want to exit?',
	title: 'Warning'
});
******************** Regular Dialogs  ************************* 
import { confirm, custom, alert } from 'devextreme/ui/dialog';
option1
this.$nextTick(function() {
let result = confirm("<i>Are you sure?</i>", "Confirm changes");
})

option 2
this.$nextTick(function() {
	let myDialog = custom({
		title: "Custom dialog",
		messageHtml: "<b>Dialog with custom buttons</b>",
		buttons: [{
			text: "button 1",
			onClick: (e) => {
				return { buttonText: e.component.option("text") }
			}
		}]
	});
	myDialog.show().then((dialogResult) => {
			console.log(dialogResult.buttonText);
	});
})

alert("Message here", "Error")
*************************  Vuetify Programmatic Dialogs  ************************* 
import Vuetify, { VDialog } from 'vuetify/lib'

this.$dialog.notify.error("Test", {
	position: 'bottom-left',
	timeout: 5000
});



******************** Vuetify Textfield Rules and Mask  ************************* 
mask requires v-mask
<v-text-field
:rules="passwordRules"
:mask="mask"
</v-text-field>
data: {
	mask: '#,###,###', - Numbers
	letterMask: 'XXXX', - letters
	passwordRules: [ 
    v => !!v || 'Password is required', 
    v => (v && v.length >= 5) || 'Password must have 5+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
    v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
	]
}
<v-text-field
	label="Card Number"
	@input="maskTest($event)"
	:value="parsedCCNumber"
	v-mask="'#### #### #### ####'"
></v-text-field>
methods: {
	maskTest(evt) {
		console.log('evt', evt)
		this.parsedCCNumber = evt
	}
}

<v-text-field
	v-model="userForm.password"
	:rules="[rules.required, rules.min1Letter, rules.min1Num, rules.min6Chars,]"
	label="Password"
	required
	:type="showPW ? 'text' : 'password'"
	:append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
	@click:append="showPW = !showPW"
	hint="At least 8 characters, Min 1 Letter, Min 1 Number"
></v-text-field>
rules: {
	required: value => !!value || 'Required',
	min8Chars: v => v.length >= 8 || 'Min 8 characters',
	min6Chars:	v => /^.{6,}$/.test(v) || 'Min 6 characters',
	min1Num:	v => /[0-9]+/.test(v) || 'Min 1 number',
	min1Letter: v => /[a-zA-Z]+/.test(v) || 'Min 1 letter',
}
******************** Set data properties to value returned from Vuex getter  ************************* 
data () {
  return {
    itemDetail: null
  };
},
computed: {
  itemData () {
    return this.$store.getters.getItemDetail(this.item.id);
  }
},
watch: {
  itemData (newVal, oldVal) {
    this.itemDetail = _.cloneDeep(newVal);
  }
}
//Vuex Getters
getters: {
  getItemDetail: (state, getters) => (id) => {
    let item = state.openedItems.items.find(i => i.id === id);
    return item ? item.data : null;
  }
}

******************** Working Vue Reactivity Mutations in Vuex  ************************* 
Vue.set(state.shippingRates, title, payload);
DOES NOT WORK - to add multiple items to object
state.shippingRates[title] = Object.assign({}, payload)

***************************************Lazy Load Comonents with PreLoader*********************************************
<script>
  const notificationMessagesComponent = import("@/components/universal/notification-messages-component.vue");
  import LoadingState from '@/components/universal/loading-state-component.vue';
  import ErrorState from '@/components/universal/error-state-component.vue';

  components: {
      "notification-messages-component": () => ({
      component: notificationMessagesComponent,
      loading: LoadingState,
      error: ErrorState,
      delay:100,
      timeout: 0
    })
  }
</script>



******************** Images ************************* 
	<v-img src="@/assets/static/web/static/UserProfile600x600.png" max-width="150" max-height="150" alt="Profile"> </v-img>


******************** Python Object is not subscriptable  ************************* 

transastion_type = getToken
method = data.get('ssl_transaction_type', None)
print('method', method)
getattr(Validation, method)(self, **data)
--> result is Validaiton.getToken(self, **data)

******************** Get Base64 from file  ************************* 

var profileReader = new FileReader();
profileReader.readAsDataURL(this.profile_img);
profileReader.onload = (e) => {
	this.merchantForm.profile_img = e.target.result;
};

******************** PYTHON List Comprehension  *************************
new_list = [expression for member in iterable (if conditional)]


