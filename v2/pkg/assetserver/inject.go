package assetserver

import "reflect"

type Inject interface {
	// ToJSON 注入的函数描述
	// {
	//	    "injectName1": {
	//	      "method1": {
	//	         "call": ""
	//	      },
	//	  	  "method2": {
	//	         "call": ""
	//	      },
	//	    },
	//	    "injectName2": {
	//	      "method1": {
	//	         "call": ""
	//	      }
	//	    },
	//	 }
	ToJSON() string
	// ObjectList 直接注入对像, 如： window.X = {}
	ObjectList() []string
}

var injectType = reflect.TypeOf((*Inject)(nil)).Elem()

func InjectCase(a any) (Inject, bool) {
	val := reflect.ValueOf(a)
	if val.CanInterface() && val.Type().Implements(injectType) {
		var v = val.Interface().(Inject)
		return v, true
	}
	return nil, false
}
