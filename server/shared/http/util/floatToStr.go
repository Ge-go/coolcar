package util

import (
	rentalpb "coolcar/rental/api/gen/v1"
	"strconv"
)

// FloatToStr float 64 To str
func FloatToStr(local *rentalpb.Location) string {
	return strconv.FormatFloat(local.Latitude, 'f', -1, 64) + "," + strconv.FormatFloat(local.Longitude, 'f', -1, 64)
}
