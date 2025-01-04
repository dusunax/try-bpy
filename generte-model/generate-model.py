import bpy
import os

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 0))
cube = bpy.context.object
cube.name = 'GeneratedCube'

material = bpy.data.materials.new(name="CubeMaterial")
material.use_nodes = True 

bsdf = material.node_tree.nodes["Principled BSDF"]
bsdf.inputs["Base Color"].default_value = (1, 1, 0, 1) 

cube.data.materials.append(material)

bpy.ops.object.camera_add(location=(5, -5, 5))
camera = bpy.context.object
camera.rotation_euler = (1.1, 0, 0.8)
bpy.context.scene.camera = camera

bpy.ops.object.light_add(type='POINT', location=(5, -5, 5))
light = bpy.context.object

output_path = "/Users/du/repository/try-bpy/generte-model/export"
output_path = os.path.join(output_path, "model.glb")

bpy.ops.export_scene.gltf(filepath=output_path, export_format='GLB')

print(f"Model has been saved to: {output_path}")
