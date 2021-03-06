fs = require 'fs'
path = require 'path'

anthPack = require 'anthpack'

# For test without anthPack module
handleFileUpload = (req, res)->
	fs.readFile req.files.image.path, (err, data)->
		uploadPath = "/resources/upload"

		# TODO: Format Filename
		newFileName = req.files.image.name
		newPath = path.normalize(__config.resources) + "/upload/" + newFileName

		fs.writeFile newPath, data, (err)->
			if err
				return res.send(500, "Error!" + err)

			res.json {
				src: "/#{newFileName}"
			}

module.exports = (app)->
	# Theme upload api
	app.post "/api/upload", (req, res)->
		# when testing
		# return handleFileUpload(req, res)

		imgPath = req.files.image.path
		imgType = req.param('resType')
		imgName = req.param('resName')
		themeId = req.param('themeId')
		previewScale = JSON.parse(req.param('previewScale'))

		anthPack.format {
			themeId: themeId
			type: imgType
			name: imgName
			file: imgPath
			scale: previewScale
		}, (err, previewImgPath)->

			if err
				__log "Upload Error: ", err
				res.send 500, err
				# res.json {
				# 	success: false
				# 	# TODO: Return the FAIL 404 imgage
				# 	src: ''
				# }
				return

			# Remove image file in temp
			fs.unlink(imgPath)

			# __log "PreviewImgPath: ", previewImgPath
			# __log "config.appPath: ", __config.appPath

			url = previewImgPath
			# url = path.join(__config.packagePath, previewImgPath)
			# url = previewImgPath.replace __config.appPath, ''

			# Because of win, convert path seperator to url path style
			url = url.split(path.sep).join("/")

			res.json {
				success: true
				src: url
			}

		return


